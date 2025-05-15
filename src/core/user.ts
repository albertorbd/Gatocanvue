import type { Transaction } from "./transaction";

export type UserRole = 'admin' | 'user';

/** Modelo User según Gatocan.Model */
export interface User {
  id: number;
  name: string | null;
  lastname: string;
  email: string;//
  password?: string;    
  balance: number;
  role: UserRole;
   address?: string;  
  phone?: string;    
  transactions?: Transaction[];
}

/** DTO para crear un usuario */
export interface UserCreateDto {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

/** DTO para actualizar un usuario */
export interface UserUpdateDto {
  name?: string;
  email?: string;
  password?: string;
  address?: string;  
  phone?: string;   
}