import { createStore, CombinedState, PreloadedState, Action, Reducer, applyMiddleware } from 'redux';

import { getComposeEnhancers } from './getComposeEnhancers';

export interface ICreateReduxStoreParams<
  S extends {},
  PS extends PreloadedState<CombinedState<S>>,
  A extends Action,
> {
  reducer: Reducer<S, A>;
  preloadedState: PS;
  name: string;
}

export function createReduxStore<
  S extends {},
  PS extends PreloadedState<CombinedState<S>>,
  A extends Action,
  E extends {} = {},
  SE extends {} = {}
>({ reducer, preloadedState, name }: ICreateReduxStoreParams<S, PS, A>) {
  const storeEnchancers = getComposeEnhancers({ name })(applyMiddleware());

  return createStore<CombinedState<S>, A, E, SE>(
    reducer,
    preloadedState,
    storeEnchancers,
  );
}
