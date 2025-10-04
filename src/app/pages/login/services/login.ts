import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginModel, LoginResponse } from '../model/login.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Login {

  constructor(private http: HttpClient, private router: Router) { }


  login(credentials: LoginModel) {
    const path = environment.apiUrl + 'auth/login';
    this.http.post<LoginResponse>(path, credentials).subscribe({
      next: (response) => {
        // Handle successful login, e.g., store token, navigate to dashboard
        sessionStorage.setItem('token', response.accessToken);
        const user = {
          email: response.email,
          firstName: response.firstName,
          gender: response.gender,
          id: response.id,
          image: response.image,
          lastName: response.lastName,
          refreshToken: response.refreshToken,
          username: response.username
        };
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/todo']);

      },
      error: (error) => {
        // Handle login error
      }
    });
  }

  getCurrentToken(): string | null {
    return sessionStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentToken();
  }

  logout(): void {
    // Clear all authentication data
    sessionStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Navigate to login page
    this.router.navigate(['/login']);
  }

}
