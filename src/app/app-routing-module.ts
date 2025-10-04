import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guard/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  // Lazy load login module
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login-module').then(m => m.LoginModule),
  },
  {
    path: 'todo',
    loadChildren: () => import('./pages/todo/todo-module').then(m => m.TodoModule),
    canActivate: [authGuard]
  },
  
  // Wildcard route - should be last
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
