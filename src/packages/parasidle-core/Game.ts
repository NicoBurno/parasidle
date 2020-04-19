import { EventEmitter } from './utils/EventEmitter/EventEmitter';
import { IGameInputEvents, IGameOutputEvents } from './types/events';
import { IContext } from './types/context';
import { GameState } from './GameState/GameState';

export class Game {
  private context: IContext;
  private gameState: GameState;

  public constructor() {
    this.context = this.createContext();
    this.gameState = new GameState(this.context);

    this.emit = this.context.input.emit;
    this.on = this.context.output.on;
  }

  private createContext() {
    return {
      input: new EventEmitter<IGameInputEvents>(),
      output: new EventEmitter<IGameOutputEvents>(),
    };
  }

  public emit: EventEmitter<IGameInputEvents>['emit'];
  public on: EventEmitter<IGameOutputEvents>['on'];

  public getGameState = () => this.gameState.state;
}
