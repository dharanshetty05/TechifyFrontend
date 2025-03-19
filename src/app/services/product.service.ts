// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, StockUpdateRequest } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  // Add a new product
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/add`, product);
  }
  

  // Update an existing product
  updateProduct(id: number, name: string, price: number, quantity: number): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/update/${id}`, null, {
      params: {
        name,
        price: price.toString(),
        quantity: quantity.toString(),
      },
    });
  }

  // Get all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Get a product by ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // Get products by category
  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${categoryId}`);
  }

  // Update product stock
  updateStock(id: number, stockQuantity: number): Observable<Product> {
    const request: StockUpdateRequest = { stockQuantity };
    return this.http.patch<Product>(`${this.apiUrl}/${id}/update-stock`, request);
  }
}