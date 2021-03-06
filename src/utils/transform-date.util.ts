// This function is used by class-transformer for transform date from string to Date format
import { BadRequestException } from '@nestjs/common';
import * as _ from 'lodash';

export const TransformDate = (dateStr: string): Date | undefined => {
  if (dateStr === '' || dateStr === null || dateStr === undefined) {
    return undefined;
  }

  if (_.isString(dateStr)) {
    const date = new Date(dateStr);

    if (date.getDay() === 6 || date.getDay() === 0) {
      throw new BadRequestException(
        'The date of the lease cannot be a weekend.',
      );
    }

    return date;
  }
};
