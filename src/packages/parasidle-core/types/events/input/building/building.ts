export interface IGameInputBuildingBuyEvent {
  id: number;
  count: number;
}

export interface IGameInputBuildingEvents {
  buyBuilding: IGameInputBuildingBuyEvent;
}
