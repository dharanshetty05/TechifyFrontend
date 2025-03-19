import { Component } from '@angular/core';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-categories',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-categories.component.html',
  styleUrl: './admin-categories.component.css'
})
export class AdminCategoriesComponent {
  categories: Category[] = [];
  selectedCategory: Category | null = null;
  newCategoryName: string = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  // Load all categories
  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  // Select a category for editing
  selectCategory(category: Category): void {
    this.selectedCategory = { ...category };
    this.newCategoryName = category.name;
  }

  // Create a new category
  createCategory(): void {
    if (this.newCategoryName.trim()) {
      this.categoryService.createCategory(this.newCategoryName).subscribe(() => {
        this.newCategoryName = '';
        this.loadCategories();
      });
    }
  }

  // Update a category
  updateCategory(): void {
    if (this.selectedCategory && this.newCategoryName.trim()) {
      this.categoryService
        .updateCategory(this.selectedCategory.id, this.newCategoryName)
        .subscribe(() => {
          this.selectedCategory = null;
          this.newCategoryName = '';
          this.loadCategories();
        });
    }
  }

  // Cancel editing
  cancelEdit(): void {
    this.selectedCategory = null;
    this.newCategoryName = '';
  }
}
