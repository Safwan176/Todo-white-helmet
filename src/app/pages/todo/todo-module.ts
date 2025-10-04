import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing-module';
import { TodoScreen } from './todo-screen/todo-screen';
import { SharedModule } from '../../shared';
import { TodoTable } from './components/todo-table/todo-table';


@NgModule({
  declarations: [
    TodoScreen,
    TodoTable
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    SharedModule
  ]
})
export class TodoModule { }
