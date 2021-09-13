import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsInt, IsNumber, IsOptional } from 'class-validator';
import { TransformDate } from 'src/utils/transform-date.util';
import { TransformInt } from 'src/utils/transform-int.util';

// This class describes http query param of GET /report
export class GetReportQuery {
  @ApiProperty({
    type: 'string',
    example: '2021-08-06',
    description: 'Selected date',
  })
  @IsDate()
  @IsOptional()
  @Transform(TransformDate)
  date: Date;

  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'Selected car id',
  })
  @IsOptional()
  @IsNumber()
  @IsInt()
  @Transform(TransformInt)
  carId: number;
}
