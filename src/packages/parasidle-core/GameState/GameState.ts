import { IGameState } from '../types/state';
import { IContext } from '../types/context';

export class GameState {
  private context: IContext;
  public state: IGameState = {
    value: 0,
  };

  public constructor(context: IContext) {
    this.context = context;

    context.input.on('click', this.onClick);
  }

  private onClick = () => {
    this.state.value += 1;

    this.context.output.emit('gameStateUpdate', this.state);
  }
}
