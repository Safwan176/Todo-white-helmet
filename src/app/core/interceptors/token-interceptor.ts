import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // Get token from localStorage
  const token = sessionStorage.getItem('token');
  
  // Only add token to requests that go to your API
  if (token && req.url.includes('dummyjson.com')) {
    console.log('Adding Bearer token to request:', req.url);
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  return next(req);
};
