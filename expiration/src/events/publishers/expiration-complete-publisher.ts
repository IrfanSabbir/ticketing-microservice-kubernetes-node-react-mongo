import { ExpirationCompletedEvent, Publisher, Subjects } from "@irftickets/common";

export class ExpirationCompletedPublisher extends Publisher<ExpirationCompletedEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}