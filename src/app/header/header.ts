import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  constructor(private router: Router) {}

  logout(): void {
    // Clear all authentication data
    sessionStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.clear();
    
    // Navigate to login page
    this.router.navigate(['/login']);
  }
}
