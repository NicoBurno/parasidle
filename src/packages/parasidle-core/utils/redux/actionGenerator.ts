import { ITypedAction } from './types';

export function actionGenerator<T>(type: T): () => ITypedAction<T>;
export function actionGenerator<T, P>(type: T): (payload: P) => ITypedAction<T, P>;
export function actionGenerator<T, P = void>(type: T) {
  return (payload?: P): ITypedAction<T, P | void> => ({
    type,
    payload,
  });
}
