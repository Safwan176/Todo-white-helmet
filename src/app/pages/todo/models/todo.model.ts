export interface TodoModel {
  id: number;
  todo: string;
  completed: boolean;
  userId?: number;
}

export interface TodoResponse {
  todos: TodoModel[];
  total: number;
  skip: number;
  limit: number;
}



