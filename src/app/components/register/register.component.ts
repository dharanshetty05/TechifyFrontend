import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = signal({ email: '', password: '' });

  constructor(private authService: AuthService) {}

  updateEmail(email: string) {
    this.user.set({ ...this.user(), email });
  }

  updatePassword(password: string) {
    this.user.set({ ...this.user(), password });
  }

  register(): void {
    this.authService.register(this.user()).subscribe(() => {
      alert('Registration successful');
    });
  }
}
