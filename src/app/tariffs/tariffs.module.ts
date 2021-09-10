import { Module } from '@nestjs/common';
import { DbModule } from '../../db/db.module';
import { TariffsService } from './tariffs.service';

@Module({
  imports: [DbModule],
  providers: [TariffsService],
  exports: [TariffsService],
})
export class TariffsModule {}
