import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing-module';
import { TodoScreen } from './todo-screen/todo-screen';
import { TodoTable } from './components/todo-table/todo-table';
import { TodoDrapDrop } from './components/todo-drap-drop/todo-drap-drop';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    TodoScreen,
    TodoTable,
    TodoDrapDrop
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    SharedModule
  ]
})
export class TodoModule { }
