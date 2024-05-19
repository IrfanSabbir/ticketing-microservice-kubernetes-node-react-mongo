import { OrderCancledEvent, Publisher, Subjects } from "@irftickets/common";

export class OrderCancledPublisher extends Publisher<OrderCancledEvent> {
  readonly subject: Subjects.OrderCancled = Subjects.OrderCancled;
}