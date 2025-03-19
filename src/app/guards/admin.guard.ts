// src/app/guards/admin.guard.ts
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // You'll need to adjust this based on your auth implementation

export const AdminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAdmin()) {
    return true;
  }

  // Redirect to login page
  router.navigate(['/login']);
  return false;
};