export interface CreateOrderInput {
  name: string;
  product: string;
  quantity: number;
  price: number;
  orderDate: Date;
  notes: string;
  isPaid: boolean;
  paymentDate: Date | null;
  isDelivered: boolean;
  deliveryDate: Date | null;
  type: string;
  platform: string;
}

export interface CopyOrderInput {
  name: string;
  product: string;
  quantity: string;
  price: string;
  orderDate: string;
  notes: string;
  isPaid: boolean;
  paymentDate: string | null;
  isDelivered: boolean;
  deliveryDate: string | null;
}

export type UpdateOrderInput = Omit<CreateOrderInput, "type" | "platform">;
