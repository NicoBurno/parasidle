import { createReduxStore } from '../utils/redux';

import { reducer } from './reducer';
import { IState } from './types';
import { TActions } from './actions';

export function createStore(preloadedState: IState) {
  return createReduxStore<IState, IState, TActions>({
    name: 'parasidle-core/store',
    preloadedState,
    reducer,
  });
}

export type TStore = ReturnType<typeof createStore>;
export type TDispatch = TStore['dispatch'];
