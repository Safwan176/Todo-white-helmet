import { Component, EventEmitter, Input, OnChanges, OnInit, Output, output, SimpleChanges } from '@angular/core';
import { TodoModel } from '../../models/todo.model';

@Component({
  selector: 'app-todo-table',
  standalone: false,
  templateUrl: './todo-table.html',
  styleUrl: './todo-table.scss'
})
export class TodoTable {
  @Input() todos: TodoModel[] = [];
  @Input() columnNames: string[] = [];
  @Input() isLoading: boolean = false;
  @Output() outputCompleteTodo = new EventEmitter<TodoModel>();
  @Output() outputDeleteTodo = new EventEmitter<TodoModel>();


  completeTodo(todo: TodoModel): void {
    this.outputCompleteTodo.emit(todo);
  }

  deleteTodo(todo: TodoModel): void {
    this.outputDeleteTodo.emit(todo);
  }

}
