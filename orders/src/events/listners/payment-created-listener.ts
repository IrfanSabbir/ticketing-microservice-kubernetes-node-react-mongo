import {
  Subjects,
  Listener,
  PaymentCreatedEvent,
  OrderStatus,
} from '@irftickets/common';
import { Message } from 'node-nats-streaming';
import { OrderServiceQueueGroup } from './queue-group-name';
import { Order } from '../../models/order';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName = OrderServiceQueueGroup;

  async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    order.set({
      status: OrderStatus.Complete,
    });
    await order.save();

    msg.ack();
  }
}
