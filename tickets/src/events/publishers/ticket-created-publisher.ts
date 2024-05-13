import { Publisher, Subjects, TicketCreatedEvent } from "@irftickets/common";
export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated; 
}