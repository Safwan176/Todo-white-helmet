import { Component, inject, OnInit } from '@angular/core';
import { Todo } from '../services/todo';
import { TodoModel, TodoOption } from '../models/todo.model';

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
  todoOption = TodoOption;
  viewMode: TodoOption = TodoOption.TABLE;
  
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
    this.isLoading = true;
    this.getTodos();
  }

  clearInput(): void {
    this.selectedTodo.todo = '';
  }

  completeTodo(todo: TodoModel): void {
    // TODO: Open edit dialog or navigate to edit form
    this.selectedTodo = todo;
    this.isLoading = true;
    const updatedTodo = {completed: true };
    this.todoService.completeTodo(updatedTodo, this.selectedTodo.id).subscribe({
      next: () => {
        this.getTodos();
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
    this.isLoading = true;
    this.todoService.deleteTodo(todo.id).subscribe({
      next: () => {
        this.getTodos(); // Refresh the list after deletion
      },
      error: (error) => {
        console.error('Error deleting todo:', error);
        this.isLoading = false;
      }
    });
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.selectedTodo.todo.trim()) {
      this.addTodo();
    }
  }

  addTodo(): void {
    this.isLoading = true;
  this.selectedTodo.id = 0;
  this.selectedTodo.userId = this.userId

    this.todoService.addTodo(this.selectedTodo).subscribe({
      next: () => {
        this.getTodos(); // Refresh the list after addition
        this.selectedTodo = {} as TodoModel; // Clear the input
      },
      error: (error) => {
        console.error('Error adding todo:', error);
        this.isLoading = false;
      }
    });
  }

  // Handle todo reordering from drag-drop component
  onTodoReordered(reorderedTodos: TodoModel[]): void {
    console.log('Todos reordered:', reorderedTodos);
    this.todos = reorderedTodos;
    
    // Optional: Save the new order to the backend
    // this.todoService.updateTodoOrder(reorderedTodos).subscribe();
  }

  // Handle edit todo from drag-drop component
  editTodo(todo: TodoModel): void {
    console.log('Edit todo:', todo.id);
    this.selectedTodo = { ...todo };
    // You could open a modal or navigate to edit form here
  }

}
