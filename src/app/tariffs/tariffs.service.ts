// This file contains all methods for tariff operations
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from '../../db/constants';

@Injectable()
export class TariffsService {
  constructor(@Inject(PG_CONNECTION) private pg: any) {}
  async getTariff(tariffId) {
    const tariff = await this.pg.query(
      `SELECT * FROM tariffs WHERE id=${tariffId}`,
    );
    if (tariff.rows.length === 0) {
      throw new BadRequestException('Tariff with such id does not exist');
    }
    return tariff.rows[0];
  }
}
