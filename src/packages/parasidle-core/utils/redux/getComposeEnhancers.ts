import { compose } from 'redux';

interface IGetComposeEnhancersParams {
  name: string;
}

export function getComposeEnhancers({ name }: IGetComposeEnhancersParams) {
  if (process.env.NODE_ENV === 'development') {
    const { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ } = window;

    if (__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      return __REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        name,
      } as any);
    }
  }

  return compose;
}
