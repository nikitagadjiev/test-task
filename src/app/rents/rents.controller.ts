// This file contains all routes of app.
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateRentSession } from 'src/app/rents/interfaces/create-rent-session.interface';
import { GetRentPrice } from 'src/app/rents/interfaces/get-rent-price.interface';
import { Report } from 'src/app/rents/interfaces/report.interface';
import { RentsService } from './rents.service';
import { CreateRentSessionBody } from './dto/create-rent-session-body.dto';
import { GetRentPriceQuery } from './dto/get-rent-price-query.dto';
import { GetReportQuery } from './dto/get-report-query.dto';

@Controller('rents')
export class RentsController {
  constructor(private readonly rentService: RentsService) {}

  // Route for calculating rental price
  @Get('price')
  @ApiTags('Rents')
  @ApiOkResponse()
  async getRentPrice(@Query() query: GetRentPriceQuery): Promise<GetRentPrice> {
    return await this.rentService.getRentPrice(query);
  }

  // Route for create the rent session
  @Post('session')
  @ApiTags('Rents')
  @ApiCreatedResponse()
  async createRentSession(
    @Body() body: CreateRentSessionBody,
  ): Promise<CreateRentSession> {
    return await this.rentService.createRentSession(body);
  }

  // Route for getting the report from db
  @Get('report')
  @ApiTags('Rents')
  @ApiOkResponse()
  async getReport(@Query() query: GetReportQuery): Promise<Report> {
    return await this.rentService.getReport(query);
  }
}
