import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { LoginModel, LoginResponse } from '../model/login.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Login {
  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';
  private readonly REFRESH_TOKEN_KEY = 'refreshToken';

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Authenticate user with credentials
   * @param credentials User login credentials
   * @returns Observable<LoginResponse>
   */
  login(credentials: LoginModel): Observable<LoginResponse> {
    const path = environment.apiUrl + 'auth/login';
    
    return this.http.post<LoginResponse>(path, credentials).pipe(
      tap((response: LoginResponse) => {
        this.handleSuccessfulLogin(response);
      }),
      catchError((error: HttpErrorResponse) => {
        return this.handleLoginError(error);
      })
    );
  }

  /**
   * Handle successful login response
   * @param response Login response from server
   */
  private handleSuccessfulLogin(response: LoginResponse): void {
    try {
      // Store authentication token
      sessionStorage.setItem(this.TOKEN_KEY, response.accessToken);
      
      // Store refresh token if available
      if (response.refreshToken) {
        sessionStorage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);
      }

      // Prepare user data
      const userData = {
        id: response.id,
        email: response.email,
        username: response.username,
        firstName: response.firstName,
        lastName: response.lastName,
        gender: response.gender,
        image: response.image,
        refreshToken: response.refreshToken
      };

      // Store user information
      localStorage.setItem(this.USER_KEY, JSON.stringify(userData));

      // Navigate to dashboard
      this.router.navigate(['/todo']);

    } catch (error) {
      console.error('Error storing user data:', error);
      this.logout(); // Clear any partially stored data
      throw new Error('Failed to process login response');
    }
  }

  /**
   * Handle login errors
   * @param error HTTP error response
   * @returns Observable error
   */
  private handleLoginError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unexpected error occurred. Please try again.';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Network error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 401:
          errorMessage = 'Invalid username or password. Please check your credentials.';
          break;
        case 403:
          errorMessage = 'Access forbidden. Your account may be suspended.';
          break;
        case 404:
          errorMessage = 'Login service not found. Please contact support.';
          break;
        case 429:
          errorMessage = 'Too many login attempts. Please try again later.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        case 0:
          errorMessage = 'Unable to connect to the server. Please check your internet connection.';
          break;
        default:
          errorMessage = error.error?.message || `Login failed (Error ${error.status})`;
      }
    }

    console.error('Login error:', error);
    return throwError(() => new Error(errorMessage));
  }

  /**
   * Get current authentication token
   * @returns Current token or null
   */
  getCurrentToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Get current refresh token
   * @returns Current refresh token or null
   */
  getCurrentRefreshToken(): string | null {
    return sessionStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Check if user is authenticated
   * @returns Boolean indicating authentication status
   */
  isAuthenticated(): boolean {
    const token = this.getCurrentToken();
    if (!token) {
      return false;
    }

    try {
      // Basic token validation (you can add JWT validation here)
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        this.logout(); // Invalid token format
        return false;
      }

      // Add token expiration check if needed
      // const payload = JSON.parse(atob(tokenParts[1]));
      // const currentTime = Math.floor(Date.now() / 1000);
      // if (payload.exp && payload.exp < currentTime) {
      //   this.logout();
      //   return false;
      // }

      return true;
    } catch (error) {
      console.error('Token validation error:', error);
      this.logout();
      return false;
    }
  }

  /**
   * Get current user data
   * @returns User data or null
   */
  getCurrentUser(): any {
    try {
      const userData = localStorage.getItem(this.USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }

  /**
   * Refresh authentication token
   * @returns Observable<LoginResponse>
   */
  refreshToken(): Observable<LoginResponse> {
    const refreshToken = this.getCurrentRefreshToken();
    
    if (!refreshToken) {
      this.logout();
      return throwError(() => new Error('No refresh token available'));
    }

    const path = environment.apiUrl + 'auth/refresh';
    
    return this.http.post<LoginResponse>(path, { refreshToken }).pipe(
      tap((response: LoginResponse) => {
        sessionStorage.setItem(this.TOKEN_KEY, response.accessToken);
        if (response.refreshToken) {
          sessionStorage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.logout(); // Force logout on refresh failure
        return throwError(() => new Error('Session expired. Please login again.'));
      })
    );
  }

  /**
   * Logout user and clear all stored data
   */
  logout(): void {
    try {
      // Clear authentication data
      sessionStorage.removeItem(this.TOKEN_KEY);
      sessionStorage.removeItem(this.REFRESH_TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
      
      // Clear any other app-specific data
      localStorage.clear();
      sessionStorage.clear();

      // Navigate to login page
      this.router.navigate(['/login']);
      
    } catch (error) {
      console.error('Error during logout:', error);
      // Force navigation even if there's an error
      this.router.navigate(['/login']);
    }
  }

  /**
   * Update user profile information
   * @param userData Updated user data
   */
  updateUserData(userData: any): void {
    try {
      const currentUser = this.getCurrentUser();
      if (currentUser) {
        const updatedUser = { ...currentUser, ...userData };
        localStorage.setItem(this.USER_KEY, JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  }
}
