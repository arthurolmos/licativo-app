import { Purchase } from "../db/models/Purchase";

export interface CreatePurchaseInput extends Purchase {}
export interface UpdatePurchaseInput extends Partial<Purchase> {}
