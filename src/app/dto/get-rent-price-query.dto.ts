import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsISO8601 } from 'class-validator';
import { TransformDate } from 'src/utils/transform-date.util';

// This class describes http query param of GET /price
export class GetRentPriceQuery {
  @ApiProperty({
    type: 'string',
    example: '2021-08-06',
    description: 'Start date',
  })
  @IsDate()
  @Transform(TransformDate)
  from: Date;

  @ApiProperty({
    type: 'string',
    example: '2021-08-06',
    description: 'End date',
  })
  @IsDate()
  @Transform(TransformDate)
  to: Date;
}
