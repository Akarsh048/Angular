import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { SessionService } from '../../services/session.service';
import { Order } from '../../models/types';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.css'
})
export class OrdersPageComponent {
  message = '';
  loadedOrder: Order | null = null;
  orderIdInput = '';
  orderForm = { userId: 0, productIds: '' };

  constructor(
    private readonly apiService: ApiService,
    private readonly session: SessionService
  ) {}

  createOrder(): void {
    if (!this.session.token) {
      this.message = 'Please login first';
      return;
    }

    const productIds = this.orderForm.productIds
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean);

    const payload: Order = {
      userId: this.orderForm.userId || this.session.userId,
      productIds
    };

    this.apiService.createOrder(this.session.token, payload).subscribe({
      next: (order) => {
        this.loadedOrder = order;
        this.message = 'Order created';
      },
      error: (error) => {
        this.message = error?.error?.message || 'Failed to create order';
      }
    });
  }

  fetchOrder(): void {
    if (!this.session.token || !this.orderIdInput) {
      this.message = 'Add order id and login';
      return;
    }

    this.apiService.getOrder(this.session.token, this.orderIdInput).subscribe({
      next: (order) => {
        this.loadedOrder = order;
      },
      error: () => {
        this.message = 'Could not load order';
      }
    });
  }
}
