import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = signal({ email: '', password: '' });

  constructor(private authService: AuthService) {}

  updateEmail(email: string) {
    this.user.set({ ...this.user(), email });
  }

  updatePassword(password: string) {
    this.user.set({ ...this.user(), password });
  }

  login(): void {
    this.authService.login(this.user());
  }
}
