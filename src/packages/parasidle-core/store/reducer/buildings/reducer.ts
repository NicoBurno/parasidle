import { TBuildingsState } from '../../types/state/buildings';
import { TActions } from '../../actions';
import { EBuildingActionType } from '../../actions/buildings';

export function buildingsReducer(state: TBuildingsState = [], action: TActions) {
  switch (action.type) {
    case EBuildingActionType.Buy: {
      const index = state.findIndex(({ id }) => id === action.payload.id);

      if (index === -1) {
        return state;
      }

      const nextState = [...state];
      const clonedBuilding = { ...state[index] };
      clonedBuilding.count += action.payload.count;
      nextState[index] = clonedBuilding;

      return nextState;
    }

    default:
      return state;
  }
}
