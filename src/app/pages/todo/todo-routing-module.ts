import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoScreen } from './todo-screen/todo-screen';

const routes: Routes = [
  {
    path: '',
    component: TodoScreen
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
