import { Component, inject, OnInit } from '@angular/core';
import { Todo } from '../services/todo';
import { TodoModel } from '../models/todo.model';

@Component({
  selector: 'app-todo-screen',
  standalone: false,
  templateUrl: './todo-screen.html',
  styleUrl: './todo-screen.scss'
})
export class TodoScreen implements OnInit {

  todoService = inject(Todo);
  userId: number = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).id : 0;
  selectedTodo: TodoModel = {id: 0, todo: '', completed: false, userId: this.userId} as TodoModel;
  todos: TodoModel[] = [];
  columnNames: string[] = ['id', 'todo', 'completed', 'userId', 'actions'];
  
  // Single loading state for all operations
  isLoading = false;

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.isLoading = true;
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.todos = todos.todos as TodoModel[];
        this.selectedTodo.todo = ''; 
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching todos:', error);
        this.isLoading = false;
      }
    });
  }

  refreshTodos(): void {
    console.log('🔄 Refreshing todos...');
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
        this.getTodos();
      }
    });
  }

  deleteTodo(todo: TodoModel): void {
    this.todoService.deleteTodo(todo.id).subscribe({
      next: () => {
        this.getTodos(); // Refresh the list after deletion
      },
      error: (error) => {
        console.error('Error deleting todo:', error);
      }
    });
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.selectedTodo.todo.trim()) {
      this.addTodo();
    }
  }

  addTodo(): void {
  // if(this.selectedTodo.id > 0){
  //   this.todoService.editTodo(this.selectedTodo).subscribe((response) => {
  //       this.selectedTodo = {} as TodoModel; // Clear the input
  //       this.getTodos();
  //   })
  //   return
  // }
  this.selectedTodo.id = 0;
  this.selectedTodo.userId = this.userId

    this.todoService.addTodo(this.selectedTodo).subscribe({
      next: () => {
        this.getTodos(); // Refresh the list after addition
        this.selectedTodo = {} as TodoModel; // Clear the input
      },
      error: (error) => {
        console.error('Error adding todo:', error);
      }
    });
  }

}
