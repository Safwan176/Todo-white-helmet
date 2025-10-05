import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Todo } from '../services/todo';
import { TodoModel, TodoOption } from '../models/todo.model';
import { ConfirmationModal } from '../../../shared/components/confirmation-modal/confirmation-modal';

@Component({
  selector: 'app-todo-screen',
  standalone: false,
  templateUrl: './todo-screen.html',
  styleUrl: './todo-screen.scss'
})
export class TodoScreen implements OnInit {

  todoService = inject(Todo);
  dialog = inject(MatDialog);
  userId: number = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).id : 0;
  selectedTodo: TodoModel = {id: 0, todo: '', completed: false, userId: this.userId} as TodoModel;
  todos: TodoModel[] = [];
  columnNames: string[] = ['id', 'todo', 'completed', 'userId', 'actions'];
  todoOption = TodoOption;
  viewMode: TodoOption = TodoOption.TABLE;
  

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.todos = todos.todos as TodoModel[];
        this.selectedTodo.todo = ''; 
      },
      error: (error) => {
        console.error('Error fetching todos:', error);
      }
    });
  }

  refreshTodos(): void {
    this.getTodos();
  }

  clearInput(): void {
    this.selectedTodo.todo = '';
  }

  completeTodo(todo: TodoModel): void {
    // TODO: Open edit dialog or navigate to edit form
    this.selectedTodo = todo;
    const updatedTodo = {completed: true };
    this.todoService.completeTodo(updatedTodo, this.selectedTodo.id).subscribe({
      next: () => {
        // this.getTodos();
        todo.completed = true;
      }
    });
  }

  setViewMode(mode: TodoOption): void {
    switch(mode) {
      case TodoOption.TABLE:
        this.viewMode = TodoOption.TABLE;
        break;
      case TodoOption.DRAG:
        this.viewMode = TodoOption.DRAG;
        break;
    }
  }

  deleteTodo(todo: TodoModel): void {
    const dialogRef = this.dialog.open(ConfirmationModal, {
      data: {
        title: 'Delete Todo',
        message: `Are you sure you want to delete "${todo.todo}"?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.todos.findIndex(t => t.id === todo.id);
        if (index > -1) {
          this.todos.splice(index, 1);
        }
      }
    });
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.selectedTodo.todo.trim()) {
      this.addTodo();
    }
  }

  addTodo(): void {
    const newTodo: TodoModel = {
      ...this.selectedTodo,
      id: new Date().getTime(), // Temporary unique ID
    };
    this.todos.unshift(newTodo);
    this.selectedTodo = {id: 0, todo: '', completed: false, userId: this.userId} as TodoModel;
  }

  // Handle edit todo from drag-drop component
  editTodo(todo: TodoModel): void {
    console.log('Edit todo:', todo.id);
    this.selectedTodo = { ...todo };
    // You could open a modal or navigate to edit form here
  }

}
