// src/app/components/navbar/navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  categories: Category[] = [];
  isAdmin = false;
  
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    // Subscribe to the auth service to get current user updates
    this.loadCategories();
    this.isAdmin = this.authService.isAdmin();
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }
  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Failed to load categories', err);
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}