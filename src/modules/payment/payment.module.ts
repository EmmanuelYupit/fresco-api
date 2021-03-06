import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { Order } from '../order/entities/order.entity';
import { AuthModule } from '../auth/auth.module';
import { OrderModule } from '../order/order.module';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { OrderService } from '../order/order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, Order]),
    AuthModule,
    PaymentModule,
    OrderModule,
  ],
  providers: [PaymentService, OrderService],
  controllers: [PaymentController],
})
export class PaymentModule {}
