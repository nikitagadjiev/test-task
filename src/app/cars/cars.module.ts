import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { CarsService } from './cars.service';

@Module({
  imports: [DbModule],
  providers: [CarsService],
  exports: [CarsService],
})
export class CarsModule {}
