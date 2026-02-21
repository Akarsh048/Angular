import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { SessionService } from '../../services/session.service';
import { Product } from '../../models/types';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css'
})
export class ProductsPageComponent implements OnInit {
  message = '';
  editingId = '';
  products: Product[] = [];
  productForm: Product = { name: '', price: 0, description: '' };

  constructor(
    private readonly apiService: ApiService,
    private readonly session: SessionService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.apiService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: () => {
        this.message = 'Could not load products';
      }
    });
  }

  saveProduct(): void {
    if (!this.session.token) {
      this.message = 'Please login first';
      return;
    }

    if (this.editingId) {
      this.apiService.updateProduct(this.session.token, this.editingId, this.productForm).subscribe({
        next: () => {
          this.resetForm();
          this.loadProducts();
        },
        error: () => {
          this.message = 'Failed to update product';
        }
      });
      return;
    }

    this.apiService.createProduct(this.session.token, this.productForm).subscribe({
      next: () => {
        this.resetForm();
        this.loadProducts();
      },
      error: () => {
        this.message = 'Failed to create product';
      }
    });
  }

  editProduct(product: Product): void {
    this.editingId = product._id || '';
    this.productForm = {
      name: product.name,
      price: product.price,
      description: product.description
    };
  }

  deleteProduct(id: string): void {
    if (!this.session.token) {
      this.message = 'Please login first';
      return;
    }

    this.apiService.deleteProduct(this.session.token, id).subscribe({
      next: () => this.loadProducts(),
      error: () => {
        this.message = 'Failed to delete product';
      }
    });
  }

  resetForm(): void {
    this.editingId = '';
    this.productForm = { name: '', price: 0, description: '' };
  }
}
