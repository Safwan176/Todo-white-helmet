import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { TodoModel, TodoResponse } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class Todo {
  constructor(private http: HttpClient) { }

  getTodos(): Observable<TodoResponse> {
    const path = environment.apiUrl + 'todos';
    return this.http.get<TodoResponse>(path);
  }

  getTodoById(id: number) : Observable<TodoModel>{
    const path = environment.apiUrl + `todos/${id}`;
    return this.http.get<TodoModel>(path);
  }

  deleteTodo(id: number): Observable<void> {
    const path = environment.apiUrl + `todos/${id}`;
    return this.http.delete<void>(path);
  }

  addTodo(todo: TodoModel): Observable<any> {
    const path = environment.apiUrl + 'todos/add';
    return this.http.post(path, todo);
  }

  completeTodo(todo: {completed: boolean}, id: number): Observable<any>{
    const path = environment.apiUrl + `todos/${id}`;
    return this.http.put(path, todo)
  }


  
}
