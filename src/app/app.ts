import { Component, OnInit, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Login } from './pages/login/services/login';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('Todo');
  user = signal(localStorage.getItem('user'));
  private currentRoute = signal('');

  constructor(
    private router: Router,
    private loginService: Login
  ) {}

  ngOnInit() {
    // Track route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute.set(event.urlAfterRedirects);
    });
  }

  shouldShowHeader(): boolean {
    // Don't show header on login page or if user is not authenticated
    return !this.currentRoute().includes('/login') && this.loginService.isAuthenticated();
  }
}
