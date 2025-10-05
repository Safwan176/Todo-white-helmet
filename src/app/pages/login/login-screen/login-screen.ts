import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Login } from '../services/login';
import { LoginModel } from '../model/login.model';

@Component({
  selector: 'app-login-screen',
  standalone: false,
  templateUrl: './login-screen.html',
  styleUrl: './login-screen.scss'
})
export class LoginScreen implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;
  errorMessage = '';
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: Login,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    // Check if user is already logged in
    if (this.loginService.isAuthenticated()) {
      this.router.navigate(['/todo']);
    }
  }

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  // Handle form submission
  onLogin(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const loginData: LoginModel = {
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value
      };

      this.loginService.login(loginData).subscribe({
        next: (response) => {
          // Success is handled in the service
          this.isLoading = false;
          
          this.snackBar.open('Login successful! Welcome back!', 'Close', {
            duration: 2000,
            panelClass: ['success-snackbar']
          });
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'Login failed. Please try again.';
          
          this.snackBar.open(this.errorMessage, 'Close', {
            duration: 4000,
            panelClass: ['error-snackbar']
          });

          // Clear password field on error
          this.loginForm.get('password')?.setValue('');
          this.loginForm.get('password')?.markAsUntouched();
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched(this.loginForm);
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }

  // Utility method to mark all form controls as touched
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  // Handle forgot password
  onForgotPassword(): void {
    this.snackBar.open('Password reset functionality coming soon!', 'Close', {
      duration: 3000,
      panelClass: ['info-snackbar']
    });
  }

  // Handle create account
  onCreateAccount(): void {
    this.snackBar.open('Registration functionality coming soon!', 'Close', {
      duration: 3000,
      panelClass: ['info-snackbar']
    });
  }
}
