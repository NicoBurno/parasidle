import { IGameState, IGameFastState } from '../types/state';
import { IContext } from '../types/context';
import { createStore, TDispatch } from '../store/store';
import { IGameInputBuildingBuyEvent } from '../types/events/input/building';
import { IState } from '../store/types';
import { calcIncreaseRangeSum } from '../utils/math/increase';
import { buyBuilding } from '../store/actions/buildings';
import { EBuildingType } from '../types/upgrades/building';

export class GameState {
  private context: IContext;
  private dispatch: TDispatch;
  private state: IState;
  private fastState: IGameFastState = {
    value: 0,
  };

  public constructor(context: IContext) {
    this.context = context;

    this.initStore();
    this.initInterval();

    context.input.on('click', this.onClick);
    context.input.on('buyBuilding', this.onBuyBuilding);
  }

  private initInterval() {
    setInterval(this.onInterval, 1000);
  }

  private initStore() {
    const store = createStore({
      buildings: this.context.config.buildings.map(building => ({
        ...building,
        count: 0,
      }))
    });

    store.subscribe(() => {
      this.state = store.getState();

      this.context.output.emit('gameStateUpdate', this.getState());
    });

    this.state = store.getState();
    this.dispatch = store.dispatch;
  }

  private onBuyBuilding = (data: IGameInputBuildingBuyEvent) => {
    const building = this.state.buildings.find(({ id }) => id === data.id);

    if (!building) {
      throw new Error(`Building#${data.id} not found`);
    }

    const cost = calcIncreaseRangeSum(building.cost, building.count, data.count);

    if (this.fastState.value < cost) {
      throw new Error(`Building#${data.id}#${data.count} value < cost`);
    }

    this.fastState.value -= cost;

    this.dispatch(buyBuilding(data));
  }

  private onClick = () => {
    this.fastState = {
      ...this.fastState,
      value: this.fastState.value + this.getValuePerClick(),
    }

    this.context.output.emit('gameStateUpdate', this.getState());
  }

  private onInterval = () => {
    const valuePerSecond = this.getValuePerSecond();

    if (!valuePerSecond) {
      return;
    }

    this.fastState = {
      ...this.fastState,
      value: this.fastState.value + valuePerSecond,
    }

    this.context.output.emit('gameStateUpdate', this.getState());
  }

  private getValuePerClick = () => {
    return this.state.buildings
      .filter(({ type }) => type === EBuildingType.Click)
      .reduce((sum, building) => {
        return sum + calcIncreaseRangeSum(building.value, 0, building.count);
      }, 1);
  }

  private getValuePerSecond = () => {
    return this.state.buildings
      .filter(({ type }) => type === EBuildingType.Generator)
      .reduce((sum, building) => {
        return sum + calcIncreaseRangeSum(building.value, 0, building.count);
      }, 0);
  }

  public getState(): IGameState {
    return {
      ...this.state,
      ...this.fastState,
    };
  }
}
