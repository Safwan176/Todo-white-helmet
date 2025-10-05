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
  columnNames: string[] = ['id', 'todo', 'completed', 'actions'];
  todoOption = TodoOption;
  viewMode: TodoOption = TodoOption.DRAG;
  

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
    // Toggle the completion status
    todo.completed = !todo.completed;
    
    const updatedTodo = { completed: todo.completed };
    this.todoService.completeTodo(updatedTodo, todo.id).subscribe({
      next: () => {
        console.log('Todo completion status updated successfully');
      },
      error: (error) => {
        // Revert the change if API call fails
        todo.completed = !todo.completed;
        console.error('Error updating todo:', error);
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
        this.todoService.deleteTodo(todo.id).subscribe({
          next: () => {
            const index = this.todos.findIndex(t => t.id === todo.id);
            if (index > -1) {
              this.todos.splice(index, 1);
            }
            console.log('Todo deleted successfully');
          },
          error: (error) => {
            console.error('Error deleting todo:', error);
          }
        });
      }
    });
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.selectedTodo.todo.trim()) {
      this.addTodo();
    }
  }

  addTodo(): void {
    if (!this.selectedTodo.todo.trim()) {
      return;
    }

    const newTodoData: Partial<TodoModel> = {
      todo: this.selectedTodo.todo,
      completed: false,
      userId: this.userId
    };

    this.todoService.addTodo(newTodoData as TodoModel).subscribe({
      next: (response) => {
        // Add the new todo with the response ID to the beginning of the list
        const newTodo: TodoModel = {
          id: response.id || new Date().getTime(),
          todo: this.selectedTodo.todo,
          completed: false,
          userId: this.userId
        };
        this.todos.unshift(newTodo);
        this.selectedTodo = {id: 0, todo: '', completed: false, userId: this.userId} as TodoModel;
        console.log('Todo added successfully');
      },
      error: (error) => {
        console.error('Error adding todo:', error);
        // Fallback to local addition if API fails
        const newTodo: TodoModel = {
          id: new Date().getTime(),
          todo: this.selectedTodo.todo,
          completed: false,
          userId: this.userId
        };
        this.todos.unshift(newTodo);
        this.selectedTodo = {id: 0, todo: '', completed: false, userId: this.userId} as TodoModel;
      }
    });
  }

  // Handle edit todo from drag-drop component
  editTodo(todo: TodoModel): void {
    console.log('Edit todo:', todo.id);
    this.selectedTodo = { ...todo };
    // You could open a modal or navigate to edit form here
  }

}
