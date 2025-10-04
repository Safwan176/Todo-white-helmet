import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('Todo');
  user = signal(localStorage.getItem('user'));

  ngOnInit() {
    // Initialization logic can go here
    // No need to set again - already initialized above
  }
}
