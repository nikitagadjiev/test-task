import { IsNumber, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TransformInt } from 'src/utils/transform-int.util';

export class UserIdDto {
  @ApiProperty({ type: 'number', example: 1 })
  @IsNumber()
  @IsInt()
  @Transform(TransformInt)
  tariffId: number;
}
