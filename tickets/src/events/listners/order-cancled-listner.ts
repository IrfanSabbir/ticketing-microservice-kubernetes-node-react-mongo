import { Listener, NotFoundError, OrderCancledEvent, Subjects } from "@irftickets/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCancledListner extends Listener<OrderCancledEvent> {
  subject: Subjects.OrderCancled= Subjects.OrderCancled;
  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCancledEvent["data"], msg: Message): Promise<void> {
    const ticket = await Ticket.findById(data.ticket.id);

    if(!ticket) {
      throw new NotFoundError();
    }

    ticket.set({ orderId: undefined});
    await ticket.save()

    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      version: ticket.version,
      userId: ticket.userId,
      orderId: ticket.orderId,
    })

    msg.ack();
    
  }
}