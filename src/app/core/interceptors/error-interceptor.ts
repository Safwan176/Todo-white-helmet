import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Always log errors for debugging
      console.error('HTTP Error occurred:', {
        status: error.status,
        statusText: error.statusText,
        url: error.url,
        message: error.message,
        error: error.error,
        timestamp: new Date().toISOString()
      });

      // Handle different error scenarios
      switch (error.status) {
        case 401:
          // Unauthorized - clear auth and redirect to login
          console.error('Unauthorized access - redirecting to login');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.navigate(['/login']);
          break;

        case 403:
          // Forbidden - user doesn't have permission
          console.error('Access forbidden - insufficient permissions');
          break;

        case 404:
          // Not found
          console.error('Resource not found:', error.url);
          break;

        case 500:
        case 502:
        case 503:
        case 504:
          // Server errors
          console.error('Server error occurred:', error.status);
          break;

        case 0:
          // Network error (no internet, CORS, etc.)
          console.error('Network error - check internet connection');
          break;

        default:
          // Other errors
          console.error('Unexpected error:', error.status);
      }

      // Re-throw the error so components can handle it
      return throwError(() => error);
    })
  );
};
