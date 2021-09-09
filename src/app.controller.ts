import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { GetRentPrice } from './dto/get-rent-price-query.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('rent-price')
  getRentPrice(@Query() query: GetRentPrice) {
    return this.appService.getRentPrice();
  }
}
