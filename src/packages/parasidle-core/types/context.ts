import { EventEmitter } from '../utils/EventEmitter/EventEmitter';
import { IGameInputEvents, IGameOutputEvents } from './events';

export interface IContext {
  input: EventEmitter<IGameInputEvents>;
  output: EventEmitter<IGameOutputEvents>
}
