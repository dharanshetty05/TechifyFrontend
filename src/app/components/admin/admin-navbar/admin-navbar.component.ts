import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {

    constructor(
      private authService: AuthService,
      private router: Router
    ) {}

  logout(): void {
    // Show confirmation dialog
    const confirmLogout = confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      // Call the logout method from AuthService
      this.authService.logout();

      // Redirect to the home page
      this.router.navigate(['/home']);
    }
  }

}
