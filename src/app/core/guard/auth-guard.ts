import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Login } from '../../pages/login/services/login';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(Login);
  const router = inject(Router);
  
  if (loginService.isAuthenticated()) {
    // User is authenticated, allow access to the protected route
    return true;
  } else {
    // User is not authenticated, redirect to login
    router.navigate(['/login']);
    return false;
  }
};