import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, Order } from '../models/types';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = 'http://localhost:5000/api';

  constructor(private readonly http: HttpClient) {}

  private authHeaders(token: string): { headers: HttpHeaders } {
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  createProduct(token: string, product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/products`, product, this.authHeaders(token));
  }

  updateProduct(token: string, id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/products/${id}`, product, this.authHeaders(token));
  }

  deleteProduct(token: string, id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/products/${id}`, this.authHeaders(token));
  }

  createOrder(token: string, order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/orders`, order, this.authHeaders(token));
  }

  getOrder(token: string, id: string): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/orders/${id}`, this.authHeaders(token));
  }
}
