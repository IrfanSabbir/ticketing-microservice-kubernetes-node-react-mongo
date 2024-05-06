import { Message } from "node-nats-streaming";
import { Listener } from "./base-listner";

export class TicketCreatedListener extends Listener {
  subject = 'ticket:created';
  queueGroupName='ticket-service-queue-group';

  onMessage(data: any, msg: Message): void {

    console.log('Event data!', data);

    msg.ack();
  }
}