export interface Product {
  _id?: string;
  name: string;
  price: number;
  description: string;
}

export interface User {
  id: number;
  username: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface Order {
  _id?: string;
  userId: number;
  productIds: string[];
  totalAmount?: number;
}
