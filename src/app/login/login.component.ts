import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service'; 
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password).pipe(
      catchError(error => {
        console.error('Login failed', error);
        this.errorMessage = 'Invalid username or password. Please try again.';
        return of(null); 
      })
    ).subscribe({
      next: (response) => {
        if (response) {
          console.log('Login successful', response);
          localStorage.setItem('authToken', response.token); 
        }
      },
      error: (error) => {
        console.error('Error occurred during login:', error);
      }
    });
  }
}
