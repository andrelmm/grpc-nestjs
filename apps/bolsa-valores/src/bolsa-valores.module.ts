import { Module } from '@nestjs/common';
import { BolsaValoresController } from './bolsa-valores.controller';
import { BolsaValoresService } from './bolsa-valores.service';
import { OrdersModule } from './orders/orders.module';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:root@localhost:27017/bolsa_valores?authSource=admin&directConnection=true&serverSelectionTimeoutMS=2000'),
    OrdersModule
  ],
  controllers: [BolsaValoresController],
  providers: [BolsaValoresService],
})
export class BolsaValoresModule { }
