import { Message } from "node-nats-streaming";
import { Listener } from "./base-listner";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName='ticket-service-queue-group';

  onMessage(data: TicketCreatedEvent['data'], msg: Message): void {

    console.log('Event data!', data.id);
    console.log('Event data!', data.price);

    msg.ack();
  }
}