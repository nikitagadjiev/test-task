import { BadRequestException } from '@nestjs/common';
import * as _ from 'lodash';

export const TransformDate = (dateStr: string): Date => {
  if (dateStr === '' || dateStr === null || dateStr === undefined) {
    return undefined;
  }

  if (_.isString(dateStr)) {
    const date = new Date(dateStr);

    if (date.getDay() === 6 || date.getDay() === 0) {
      throw new BadRequestException(
        'The end and start of the lease cannot be a weekend.',
      );
    }

    return date;
  }
};
