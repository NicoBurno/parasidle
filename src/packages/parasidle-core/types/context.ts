import { EventEmitter } from '../utils/EventEmitter/EventEmitter';
import { IGameInputEvents, IGameOutputEvents } from './events';
import { IGameConfig } from './config';

export interface IContext {
  config: IGameConfig;
  input: EventEmitter<IGameInputEvents>;
  output: EventEmitter<IGameOutputEvents>
}
