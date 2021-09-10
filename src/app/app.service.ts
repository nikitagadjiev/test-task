import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRentSession } from 'src/interfaces/create-rent-session.interface';
import { GetRentPrice } from 'src/interfaces/get-rent-price.interface';
import { CarsService } from './cars/cars.service';
import { PG_CONNECTION } from './constants';
import { CreateRentSessionBody } from './dto/create-rent-session.dto';
import { GetRentPriceParam } from './dto/get-rent-price-param.dto';
import { GetRentPriceQuery } from './dto/get-rent-price-query.dto';
import { TariffsService } from './tariffs/tariffs.service';

@Injectable()
export class AppService {
  constructor(
    @Inject(PG_CONNECTION) private pg: any,
    private readonly tariffsService: TariffsService,
    private readonly carsService: CarsService,
  ) {}

  async getRentPrice(
    query: GetRentPriceQuery,
    param: GetRentPriceParam,
  ): Promise<GetRentPrice> {
    const daysForRent = this.getDaysDiff(query.from, query.to);

    if (daysForRent < 3 || daysForRent > 30) {
      throw new BadRequestException(
        'The rental period must be between 3 and 30 daysю',
      );
    }

    const tariff = await this.tariffsService.getTariff(param.tariffId);
    const discount = await this.getDiscount(daysForRent);

    const rentPrice =
      daysForRent * tariff.price -
      ((daysForRent * tariff.price) / 100) * discount.value;
    return { rentPrice };
  }

  async createRentSession(
    body: CreateRentSessionBody,
  ): Promise<CreateRentSession> {
    const car = await this.carsService.getCarById(body.carId);
    const daysDiff = this.getDaysDiff(car.last_rent_date, new Date());

    if (car.is_rented) {
      throw new BadRequestException('The car is currently rented.');
    }

    if (daysDiff < 3) {
      throw new BadRequestException(
        'The pause between reservations must be 3 days.',
      );
    }

    await this.pg.query(`
    INSERT INTO rent_sessions
    (car_id, tariff_id, discount_id, from_date, to_date)
    VALUES(${body.carId}, ${body.tariffId}, ${
      body.discountId
    }, '${body.fromDate.toUTCString()}', '${body.toDate.toUTCString()}');
    `);

    await this.carsService.setRentStatus(body.carId, true);

    return {
      car_id: body.carId,
      tariff_id: body.tariffId,
      discount_id: body.discountId,
      from_date: body.fromDate,
      to_date: body.toDate,
    };
  }

  getDaysDiff(fromDate: Date, toDate: Date) {
    const fromDateTime = fromDate.getTime();
    const toDateTime = toDate.getTime();
    const days = Math.floor((toDateTime - fromDateTime) / (24 * 3600 * 1000));

    return days;
  }

  async getDiscount(days: number) {
    const queryResult = await this.pg.query(
      `SELECT value FROM discounts WHERE ${days} BETWEEN min_days AND max_days`,
    );

    if (queryResult.rows.length === 0) {
      throw new NotFoundException('Discounts not found');
    }

    return queryResult.rows[0];
  }
}
