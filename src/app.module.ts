import { Module } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';

@Module({
  imports: [DbModule, SwaggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
