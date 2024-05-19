import { Listener, Subjects, TicketCreatedEvent, TicketUpdatedEvent } from "@irftickets/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { OrderServiceQueueGroup }  from "./queue-group-name";

export class TicketUpdatedListener extends Listener <TicketUpdatedEvent> {
  readonly subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = OrderServiceQueueGroup;
  async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    const ticket = await Ticket.findById(data.id);

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    const { title, price } = data;
    ticket.set({ title, price });
    await ticket.save();

    msg.ack();
  }

}