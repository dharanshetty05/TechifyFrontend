import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if(localStorage.getItem('isLoggedIn') === 'true'){
      const storedRole = localStorage.getItem('role');
      if(storedRole){
        this.authService.role.set(storedRole);
        this.authService.isLoggedIn.set(true);
      }
    }
  }
}
