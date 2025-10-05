import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit{
  user = 'Guest';
  userEmail = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  private loadUserData(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        this.user = parsedUser.username || parsedUser.firstName || 'Guest';
        this.userEmail = parsedUser.email || 'user@todoapp.com';
      } catch (error) {
        console.error('Error parsing user data:', error);
        this.user = 'Guest';
        this.userEmail = 'user@todoapp.com';
      }
    }
  }

  getUserInitials(): string {
    if (!this.user || this.user === 'Guest') {
      return 'GA';
    }
    
    // Split username by spaces or common separators
    const words = this.user.toString().split(/[\s._-]+/);
    
    if (words.length >= 2) {
      // First letter of first name + First letter of last name
      return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
    } else {
      // Just first two letters of the name
      return this.user.toString().substring(0, 2).toUpperCase();
    }
  }

  getUserEmail(): string {
    return this.userEmail;
  }



  logout(): void {
    // Clear all authentication data
    sessionStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.clear();
    
    // Navigate to login page
    this.router.navigate(['/login']);
  }
}
