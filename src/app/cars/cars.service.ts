// This file contains all methods for cars operations
import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from '../constants';

@Injectable()
export class CarsService {
  constructor(@Inject(PG_CONNECTION) private pg: any) {}

  async getCarById(id: number) {
    const queryResult = await this.pg.query(
      `SELECT * FROM cars WHERE id=${id}`,
    );
    return queryResult.rows[0];
  }

  async setRentStatus(carId: number, status: boolean) {
    await this.pg.query(
      `UPDATE public.cars
        SET  is_rented=${status}
        WHERE id=${carId};`,
    );
  }

  async getRentsCount(carId: number) {
    const queryResult = await this.pg
      .query(`SELECT count(id) as rents_count, car_id 
  FROM rent_sessions where car_id = ${carId} GROUP BY car_id;`);
    return queryResult.rows;
  }

  async getAllCarsRentsCount() {
    const queryResult = await this.pg
      .query(`SELECT count(*) as rents_count, car_id 
      FROM public.rent_sessions  group by car_id;`);
    return queryResult.rows;
  }
}
