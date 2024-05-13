import { Publisher, Subjects, TicketUpdatedEvent } from "@irftickets/common";
export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject: Subjects.TicketUpdated = Subjects.TicketUpdated; 
}