import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TodoModel } from '../../models/todo.model';

@Component({
  selector: 'app-todo-drap-drop',
  standalone: false,
  templateUrl: './todo-drap-drop.html',
  styleUrl: './todo-drap-drop.scss'
})
export class TodoDrapDrop  {
  @Input() todos: TodoModel[] = [];
  @Input() isLoading: boolean = false;
  
}
