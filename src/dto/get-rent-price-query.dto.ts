import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsInt, IsISO8601, IsNumber } from 'class-validator';
import { TransformDate } from 'src/utils/transform-date.util';
import { TransformInt } from 'src/utils/transform-int.util';

export class GetRentPrice {
  @ApiProperty({ type: 'string' })
  @IsDate()
  @Transform(TransformDate)
  @IsISO8601()
  from: Date;

  @ApiProperty({ type: 'string' })
  @IsDate()
  @Transform(TransformDate)
  @IsISO8601()
  to: Date;
}
