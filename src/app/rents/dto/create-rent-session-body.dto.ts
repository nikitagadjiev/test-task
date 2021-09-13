import { IsNumber, IsInt, IsDate } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TransformInt } from '../../../utils/transform-int.util';
import { TransformDate } from 'src/utils/transform-date.util';

// This class describes http body of POST /session
export class CreateRentSessionBody {
  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'Selected tariff id',
  })
  @IsNumber()
  @IsInt()
  @Transform(TransformInt)
  tariffId: number;

  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'Selected tariff id',
  })
  @IsNumber()
  @IsInt()
  @Transform(TransformInt)
  carId: number;

  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'Selected tariff id',
  })
  @IsNumber()
  @IsInt()
  @Transform(TransformInt)
  discountId: number;

  @ApiProperty({
    type: 'string',
    example: '2021-08-06',
    description: 'Start date',
  })
  @IsDate()
  @Transform(TransformDate)
  fromDate: Date;

  @ApiProperty({
    type: 'string',
    example: '2021-08-06',
    description: 'End date',
  })
  @IsDate()
  @Transform(TransformDate)
  toDate: Date;
}
