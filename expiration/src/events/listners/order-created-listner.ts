import { Listener, OrderCreatedEvent, OrderStatus, Subjects } from "@irftickets/common";
import { ExpirationServiceQueueGroup } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";

export class OrderCreatedListner extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = ExpirationServiceQueueGroup;

  onMessage(data: OrderCreatedEvent["data"], msg: Message): void {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log('Waiting this many milliseconds to process the job:', delay);

    expirationQueue.add(
      {
        orderId: data.id,
      },
      {
        delay: 10000
      }
    )

    msg.ack();
  }
}