import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit{
  user = localStorage.getItem('user');

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialization logic can go here if needed
    this.user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).username : 'Guest';
  }

  getUserInitials(): string {
    if (!this.user || this.user === 'Guest') {
      return 'G';
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

  logout(): void {
    // Clear all authentication data
    sessionStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.clear();
    
    // Navigate to login page
    this.router.navigate(['/login']);
  }
}
