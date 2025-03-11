import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';

  isLoggedIn = signal<boolean>(false);
  role = signal<string | null>(null);
  
  constructor(private http: HttpClient, private router: Router) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(user: any): void {
    this.http.post<{ token: string; role: string }>(`${this.baseUrl}/login`, user)
      .subscribe(response => {
        if (response.token) {
          this.isLoggedIn.set(true);
          this.role.set(response.role);

          // Store role in local storage so it persists after refresh
          localStorage.setItem('role', response.role);
          localStorage.setItem('isLoggedIn', 'true');

          // Redirect based on role
          if (response.role === 'ADMIN') {
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.router.navigate(['/customer-dashboard']);
          }
        } else {
          alert('Invalid credentials');
        }
      });
  }

  logout(): void {
    this.isLoggedIn.set(false);
    this.role.set(null);
    localStorage.removeItem('role');
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  getRole(): Observable<string | null> {
    return toObservable(this.role);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
