// This file contains main module and all imports.
import { Module } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { RentsController } from './rents/rents.controller';
import { RentsService } from './rents/rents.service';
import { DbModule } from '../db/db.module';
import { TariffsModule } from './tariffs/tariffs.module';
import { CarsModule } from './cars/cars.module';
import { RentsModule } from './rents/rents.module';
import { ConfigModule } from './config/config.module';

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
export class AppModule {}
