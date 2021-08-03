import Todo from "./Todo";
import { v4 as uuid4 } from "uuid";

interface ITodoList {
  validateIdExist: (id: string) => boolean;
  FetchAllTodos: () => Todo[];
  FetchSingleTodo: (id: string) => Todo | string;
  CreateTodo: (title: string, descripton: string) => Todo;
  DeleteTodo: (id: string) => Todo[] | string;
  UpdateTodo: (id: string, state: string) => Todo | string;
}

export default class TodoList implements ITodoList {
  public static allTodos: Todo[] = new Array();

  validateIdExist(id: string): boolean {
    let index;
    const List = TodoList.allTodos;
    for (index in TodoList.allTodos) {
      if (List.hasOwnProperty(index) && List[index].id === id) {
        return true;
      }
    }
    return false;
  }

  public CreateTodo(title: string, description: string): Todo {
    const id: string = uuid4();
    const state: string = "todo";

    const Todo = {
      id,
      state,
      title,
      description,
    };

    TodoList.allTodos.push(Todo);
    return Todo;
  }

  public UpdateTodo(id: string, state: string): Todo | string {
    const IdExist = this.validateIdExist(id);
    if (!IdExist) {
      return "Not Valid ID :/";
    }
    const indexOfTodo = TodoList.allTodos.findIndex((todo) => todo.id === id);
    const Todos = [...TodoList.allTodos];
    Todos[indexOfTodo] = { ...Todos[indexOfTodo], state };

    TodoList.allTodos = Todos;

    return Todos[indexOfTodo];
  }

  public DeleteTodo(id: string): Todo[] | string {
    const IdExist = this.validateIdExist(id);
    if (!IdExist) {
      return "Not Valid ID :/";
    }
    const Todos = [...TodoList.allTodos];
    const UpdatedTodos = Todos.filter((todo) => todo.id !== id);
    TodoList.allTodos = UpdatedTodos;
    return UpdatedTodos;
  }

  public FetchSingleTodo(id: string): Todo | string {
    const IdExist = this.validateIdExist(id);
    if (!IdExist) {
      return "Not Valid ID :/";
    }
    const Todo = TodoList.allTodos.find((todo) => todo.id === id);
    if (Todo) {
      return Todo;
    } else {
      return `invalid input`;
    }
  }

  public FetchAllTodos(): Todo[] {
    return TodoList.allTodos;
  }
}
