import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from './constants';

@Injectable()
export class AppService {
  constructor(@Inject(PG_CONNECTION) private pg: any) {}
  async getRentPrice() {
    return await this.pg.query(`SELECT * FROM cars`);
  }
}
