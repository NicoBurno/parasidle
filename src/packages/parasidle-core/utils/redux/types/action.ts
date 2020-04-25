export interface ITypedAction<T, P = void> {
  type: T;
  payload: P;
}
