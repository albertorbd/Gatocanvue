import type { Product } from "./product";
import type { User } from "./user";

export type TransactionType = 'Ingreso' | 'Compra';


export interface Transaction {
  id: number;
  userId: number;
  productId?: number;
  amount: number;
  quantity: number;
  date: string;            
  paymentMethod: string;
  tipo: TransactionType;
  user?: User;
  product?: Product;
}


export interface DepositDto {
  userId: number;
  amount: number;
  paymentMethod: string;
}


export interface PurchaseDto {
  userId: number;
  productId: number;
  quantity: number;
  paymentMethod: string;
}