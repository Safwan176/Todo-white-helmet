import { Component } from '@angular/core';
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
export class LoginScreen {
  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: Login,
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  // Handle form submission
  onLogin(): void {
    debugger
    this.loginService.login(this.loginForm.value)

  }

}
