import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './interceptors/token-interceptor';
import { errorInterceptor } from './interceptors/error-interceptor';
import { loaderInterceptor } from './interceptors/loader.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    // Modern interceptor approach - ORDER MATTERS!
    provideHttpClient(
      withInterceptors([
        loaderInterceptor,   // First: Show loader
        tokenInterceptor,    // Second: Add authentication
        errorInterceptor,    // Last: Handle errors
      ])
    )
  ]
})
export class CoreModule { 
  constructor() {
    console.log('🔧 CoreModule loaded with interceptors: Loader → Token → Error');
  }
}
