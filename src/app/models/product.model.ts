// src/app/models/product.model.ts
export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: Category;
}

export interface Category {
  id: number;
  name: string;
}

export interface StockUpdateRequest {
  stockQuantity: number;
}