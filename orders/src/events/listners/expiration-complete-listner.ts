import { ExpirationCompletedEvent, Listener, OrderStatus, Subjects } from "@irftickets/common";
import { Message } from "node-nats-streaming";
import { OrderServiceQueueGroup }  from "./queue-group-name";
import { Order } from "../../models/order";
import { OrderCancledPublisher } from "../publishers/order-cancled-publisher";

export class ExpirationCompleteListner extends Listener <ExpirationCompletedEvent> {
  readonly subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
  queueGroupName = OrderServiceQueueGroup;

  async onMessage(data: ExpirationCompletedEvent["data"], msg: Message) {

    const order = await Order.findById(data.orderId).populate('ticket');


    if(!order) {
      throw new Error("Not found the order");
    }

    if (order.status === OrderStatus.Complete) {
      return msg.ack();
    }

    order.set({ status: OrderStatus.Cancelled });
    await order.save();

    await new OrderCancledPublisher(this.client).publish({
      id: order._id || order.id,
      version: order.version,
      ticket: {
        id: order.ticket._id || order.ticket.id,
      },
    })

    msg.ack();
  }
}