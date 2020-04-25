import { ITypedAction } from "../../../utils/redux/types";
import { IGameInputBuildingBuyEvent } from "../../../types/events/input/building";
import { actionGenerator } from "../../../utils/redux";

export enum EBuildingActionType {
  Buy = 'BUILDING/BUY',
}

export type TBuildingBuyAction = ITypedAction<EBuildingActionType.Buy, IGameInputBuildingBuyEvent>;

export type TBuildingActions =
  | TBuildingBuyAction;

export const buyBuilding = actionGenerator<EBuildingActionType.Buy, IGameInputBuildingBuyEvent>(EBuildingActionType.Buy);
