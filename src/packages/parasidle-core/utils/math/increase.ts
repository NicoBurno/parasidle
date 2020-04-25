import { IIncreaseFnConfig } from '../../types/math/increase';

export function calcIncreaseValue({ base, increase }: IIncreaseFnConfig, count: number) {
  return Math.round(base * Math.pow(increase, count));
}

export function calcIncreaseRangeSum(config: IIncreaseFnConfig, start: number, count: number) {
  if (config.increase === 1) {
    return config.base * count;
  }

  return new Array(count).fill(null).reduce((sum, _, i) => {
    return sum + calcIncreaseValue(config, start + i);
  }, 0);
}
