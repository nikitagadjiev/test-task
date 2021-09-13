import { Module } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { DbModule } from 'src/db/db.module';
import { CarsModule } from '../cars/cars.module';
import { ConfigModule } from '../config/config.module';
import { TariffsModule } from '../tariffs/tariffs.module';
import { RentsController } from './rents.controller';
import { RentsService } from './rents.service';

@Module({
  imports: [
    DbModule,
    SwaggerModule,
    TariffsModule,
    CarsModule,
    RentsModule,
    ConfigModule,
  ],
  controllers: [RentsController],
  providers: [RentsService],
})
export class RentsModule {}
