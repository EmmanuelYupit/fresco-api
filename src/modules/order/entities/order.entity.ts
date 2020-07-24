import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
  JoinColumn,
  OneToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/user.entity';
import { OrderDeliver } from './orderDeliver.entity';
import { OrderProduct } from './orderProduct.entity';
import { Payment } from '../../payment/payment.entity';

export enum OrderStatus {
  inProcess = 'IN_PROCESS',
  paymentChoosen = 'PAYMENT_CHOOSEN',
  payed = 'PAYED',
  confirmed = 'CONFIRMED',
  inDeliveryProcess = 'IN_DELIVERY_PROCESS',
  finished = 'FINISHED',
  cancelled = 'CANCELLED',
}

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Index()
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.inProcess,
  })
  status: OrderStatus;

  @Column({ name: 'total_price' })
  totalPrice: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
  updateAt: Date;

  @ManyToOne(type => User)
  @JoinColumn()
  user: User;

  @OneToOne(type => OrderDeliver)
  @JoinColumn()
  orderDeliver: OrderDeliver;

  @OneToOne(type => Payment)
  @JoinColumn()
  payment: Payment;

  @OneToMany(
    type => OrderProduct,
    orderProduct => orderProduct.order,
  )
  orderProducts: OrderProduct[];
}
