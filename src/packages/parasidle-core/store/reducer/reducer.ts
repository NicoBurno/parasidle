import { combineReducers } from 'redux';
import { IState } from '../types';

import { buildingsReducer } from './buildings/reducer';

export const reducer = combineReducers<IState>({
  buildings: buildingsReducer
});
