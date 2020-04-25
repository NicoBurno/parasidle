import { IBuildingConfig, EBuildingType } from '../../../types/upgrades/building';

export const CLICK_BUILDINGS_CONFIG: IBuildingConfig[] = [
  25,
].map((baseCost, i) => ({
  id: (i + 1),
  type: EBuildingType.Click,
  title: `Click ${i + 1}`,
  cost: {
    base: baseCost,
    increase: 1.1,
  },
  value: {
    base: 1,
    increase: 1,
  }
}));

export const GENERATOR_BUILDINGS_CONFIG: IBuildingConfig[] = [
  100,
  500,
  3000,
  15000,
  100000,
  500000,
  2500000,
  10000000,
  50000000,
].map((baseCost, i) => ({
  id: (i + 1) * 1000,
  type: EBuildingType.Generator,
  title: `Generator ${i + 1}`,
  cost: {
    base: baseCost,
    increase: 1.1,
  },
  value: {
    base: baseCost / 100,
    increase: 1,
  }
}));

export const BUILDINGS_CONFIG = [
  ...CLICK_BUILDINGS_CONFIG,
  ...GENERATOR_BUILDINGS_CONFIG
];
