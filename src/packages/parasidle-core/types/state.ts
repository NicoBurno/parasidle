import { IState } from '../store/types';

export interface IGameFastState {
  value: number;
}

export interface IGameState extends IGameFastState, IState {}
