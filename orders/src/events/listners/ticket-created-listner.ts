import { Listener, Subjects, TicketCreatedEvent } from "@irftickets/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { OrderServiceQueueGroup }  from "./queue-group-name";

export class TicketCreatedListener extends Listener <TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = OrderServiceQueueGroup;
  async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    const { id, title, price } = data;
    console.log({id, title, price})

    const ticket = Ticket.build({
      id, title, price
    });
    await ticket.save();

    msg.ack();
  }
}