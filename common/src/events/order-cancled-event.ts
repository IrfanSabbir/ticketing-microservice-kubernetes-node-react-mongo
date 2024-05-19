import { Message } from "node-nats-streaming";
import { OrderStatus } from "./types/order-status";
import { Subjects } from "./subjects";

export interface OrderCancledEvent {
  subject: Subjects.OrderCancled,
  data: {
    id: string,
    ticket: {
      id: string;
    };
  }
}