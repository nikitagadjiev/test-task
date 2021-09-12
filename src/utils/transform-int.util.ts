// This function is used by class-transformer for transform id params from string to number format
import * as _ from 'lodash';

export function TransformInt(value: any): number {
  if (value === '' || value === null || value === undefined) {
    return undefined;
  }

  const number = parseInt(value, 10);

  if (_.isInteger(number)) {
    return number;
  }

  return number;
}
