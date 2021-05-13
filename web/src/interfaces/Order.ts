import { Sale } from "../db/models/Sale";
import { Purchase } from "../db/models/Purchase";

export type Order = Partial<Sale & Purchase>;
