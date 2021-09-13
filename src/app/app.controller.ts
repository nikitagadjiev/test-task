// This file contains all routes of app.
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateRentSession } from 'src/interfaces/create-rent-session.interface';
import { GetRentPrice } from 'src/interfaces/get-rent-price.interface';
import { Report } from 'src/interfaces/report.interface';
import { AppService } from './app.service';
import { CreateRentSessionBody } from './dto/create-rent-session-body.dto';
import { GetRentPriceParam } from './dto/get-rent-price-param.dto';
import { GetRentPriceQuery } from './dto/get-rent-price-query.dto';
import { GetReportQuery } from './dto/get-report-query.dto';

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller('rent')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Route for calculating rental price
  @Get('price/:tariffId')
  @ApiOkResponse()
  async getRentPrice(
    @Query() query: GetRentPriceQuery,
    @Param() param: GetRentPriceParam,
  ): Promise<GetRentPrice> {
    return await this.appService.getRentPrice(query, param);
  }

  // Route for create the rent session
  @Post('session')
  @ApiCreatedResponse()
  async createRentSession(
    @Body() body: CreateRentSessionBody,
  ): Promise<CreateRentSession> {
    return await this.appService.createRentSession(body);
  }

  // Route for getting the report from db
  @Get('report')
  @ApiOkResponse()
  async getReport(@Query() query: GetReportQuery): Promise<Report> {
    return await this.appService.getReport(query);
  }
}
