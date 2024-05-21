import { Subjects } from "./subjects";

export interface ExpirationCompletedEvent {
  subject: Subjects.ExpirationComplete,
  data: {
    orderId: string,
  }
}