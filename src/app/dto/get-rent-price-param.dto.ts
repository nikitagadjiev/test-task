import { IsNumber, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TransformInt } from '../../utils/transform-int.util';

export class GetRentPriceParam {
  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'Selected tariff id',
  })
  @IsNumber()
  @IsInt()
  @Transform(TransformInt)
  tariffId: number;
}
