import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getRole().pipe(
    map(role => {
      if (role === 'ADMIN' || role === 'CUSTOMER') {
        return true;
      }
      router.navigate(['/login']);
      return false;
    })
  );
};
