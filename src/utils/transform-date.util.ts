import { BadRequestException } from '@nestjs/common';
import _ from 'lodash';

export const TransformDate = (dateStr: string): Date => {
  if (dateStr === '' || dateStr === null || dateStr === undefined) {
    return undefined;
  }

  if (_.isString(dateStr)) {
    const reverseDate = dateStr.split('.').reverse().join('-');

    const date = new Date(reverseDate);

    if (date.getDay() === 6 || date.getDay() === 0) {
      throw new BadRequestException(
        'The end and start of the lease cannot be a weekend.',
      );
    }

    return date;
  }
};
