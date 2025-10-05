import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TodoModel } from '../../models/todo.model';

@Component({
  selector: 'app-todo-drap-drop',
  standalone: false,
  templateUrl: './todo-drap-drop.html',
  styleUrl: './todo-drap-drop.scss'
})
export class TodoDrapDrop implements OnInit {
  @Input() todos: TodoModel[] = [];
  @Output() outputCompleteTodo = new EventEmitter<TodoModel>();
  @Output() outputDeleteTodo = new EventEmitter<TodoModel>();

  get getCompletedTodos(): TodoModel[] {
    return this.todos.filter(todo => todo.completed);
  }

  get getPendingTodos(): TodoModel[] {
    return this.todos.filter(todo => !todo.completed);
  }

  ngOnInit(): void {
    
  }

  drop(event: CdkDragDrop<TodoModel[]>) {
    if (event.previousContainer === event.container) {
      // Reordering within the same list
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Moving between lists
      const todo = event.previousContainer.data[event.previousIndex];
      
      // Update completion status based on target list
      const isMovingToCompleted = event.container.element.nativeElement.classList.contains('completed-list');
      todo.completed = isMovingToCompleted;
      
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      
      // Emit the completion event to update the backend
      this.outputCompleteTodo.emit(todo);
    }
  }

  markAsComplete(todo: TodoModel): void {
    this.outputCompleteTodo.emit(todo);
  }

  deleteTodo(todo: TodoModel): void {
    this.outputDeleteTodo.emit(todo);
  }
}
