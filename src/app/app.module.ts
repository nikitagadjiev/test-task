import { Module } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from '../db/db.module';
import { TariffsModule } from './tariffs/tariffs.module';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [DbModule, SwaggerModule, TariffsModule, CarsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
