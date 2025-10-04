import { HttpInterceptorFn } from '@angular/common/http';
import { tap, finalize } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const startTime = Date.now();
  
  console.log(`🚀 HTTP Request: ${req.method} ${req.url}`);
  
  return next(req).pipe(
    tap({
      next: (response) => {
        const duration = Date.now() - startTime;
        console.log(`✅ HTTP Response: ${req.method} ${req.url} - ${duration}ms`);
      },
      error: (error) => {
        const duration = Date.now() - startTime;
        console.log(`❌ HTTP Error: ${req.method} ${req.url} - ${duration}ms`, error);
      }
    }),
    finalize(() => {
      // Always runs after request completes
    })
  );
};