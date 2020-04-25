import { IIncreaseFnConfig } from '../math/increase';

export enum EBuildingType {
  Click = 'click',
  Generator = 'generator',
}

export interface IBuildingConfig {
  id: number;
  title: string;
  type: EBuildingType;
  cost: IIncreaseFnConfig;
  value: IIncreaseFnConfig;
}

export interface IBuilding extends IBuildingConfig {
  count: number;
}
