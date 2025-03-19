// src/app/services/category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) {}

  // Create a new category
  createCategory(name: string): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/create`, null, {
      params: { name },
    });
  }

  // Update an existing category
  updateCategory(id: number, newName: string): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/update/${id}`, null, {
      params: { newName },
    });
  }

  // Get all categories
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  // Get a category by ID
  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }
}