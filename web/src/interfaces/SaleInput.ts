import { Sale } from "../db/models/Sale";

export interface CreateSaleInput extends Sale {}
export interface UpdateSaleInput extends Partial<Sale> {}
