import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category.model';
import { Product, StockUpdateRequest } from '../../../models/product.model';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-products',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent implements OnInit{
  products: Product[] = [];
  categories: Category[] = [];
  productForm: FormGroup;
  selectedProduct: Product | null = null;
  isEditing: boolean = false;
  category: Category | null = null;

  constructor(private http: HttpClient, private fb: FormBuilder, private productService : ProductService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      categoryId: [null, Validators.required] // Make sure this is required
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.http.get<Product[]>('/api/products').subscribe(data => {
      this.products = data;
    });
  }

  loadCategories(): void {
    this.http.get<Category[]>('/api/categories').subscribe(data => {
      this.categories = data;
    });
  }

  addProduct(): void {
    if (this.productForm.valid) {
      const formValues = this.productForm.value;
  
      const categoryId = formValues.categoryId;
  
      // Ensure categoryId is a valid number before sending to the backend
      if (categoryId === null || categoryId === undefined) {
        console.error("Category ID is required.");
        return; // Don't proceed if categoryId is invalid
      }
  
      // Create the product object to send to the backend
      const product: Product = {
        name: formValues.name,
        description: formValues.description,
        price: formValues.price,
        quantity: formValues.quantity,
        category: {
          id: categoryId,
          name: ''
        } // category.id must be a valid number
      };
  
      // Send the product data to the backend
      this.productService.addProduct(product).subscribe(() => {
        this.loadProducts();
        this.productForm.reset();
      });
    }
  }
  
  
  

  editProduct(product: Product): void {
    this.selectedProduct = product;
    this.isEditing = true;
    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      categoryId: product.category.id
    });
  }

  updateProduct(): void {
    if (this.productForm.valid && this.selectedProduct) {
      const updatedProduct = { ...this.selectedProduct, ...this.productForm.value };
      this.http.put<Product>(`/api/products/update/${updatedProduct.id}`, updatedProduct).subscribe(() => {
        this.loadProducts();
        this.cancelEdit();
      });
    }
  }

  cancelEdit(): void {
    this.selectedProduct = null;
    this.isEditing = false;
    this.productForm.reset();
  }

  // deleteProduct(id: number): void {
  //   this.http.delete(`/api/products/${id}`).subscribe(() => {
  //     this.loadProducts();
  //   });
  // }

  updateStock(id: number, stockQuantity: number): void {
    this.http.patch<Product>(`/api/products/${id}/update-stock`, { stockQuantity }).subscribe(() => {
      this.loadProducts();
    });
  }
}
