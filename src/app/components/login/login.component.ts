// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  private readonly adminEmail = 'admin@gmail.com';
  private readonly adminPassword = 'admin123';  

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.errorMessage = '';
    
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password';
      return;
    }

    if (this.email === this.adminEmail && this.password === this.adminPassword) {
      // Navigate to the admin dashboard
      this.router.navigate(['/admin-dashboard']);
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/user-dashboard']);
      },
      error: (error) => {
        console.error('Login error:', error);
        this.errorMessage = error.error?.error || 'Invalid email or password';
      }
    });
  }
}