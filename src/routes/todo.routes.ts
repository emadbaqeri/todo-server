import { Router, Response, Request } from "express";

import { TodoList, Todo } from "../data";
import {
  CreateTodoValidator,
  UpdateTodoValidator,
  DeleteTodoValidator,
} from "../data/UserInputValidators";

const router = Router();

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

interface IResponse {
  status: string;
  message: string;
  data?: Todo | Todo[];
}

const ApplicationTodoList = new TodoList();

router.get("/fetchAll", (req: Request, res: Response) => {
  const Todos = ApplicationTodoList.FetchAllTodos();

  if (!Todos) {
    res.send(401).send({
      status: "401",
      message: "SOMETHING WENT WRONG :/",
    });
  }

  res.status(200).send({
    status: "200",
    message: "OK!",
    data: Todos,
  } as IResponse);
});

router.post("/create", (req: RequestWithBody, res: Response) => {
  const { title, description } = req.body;
  if (title && description) {
    const { error } = CreateTodoValidator(title, description);
    if (error) {
      res.send({
        status: "400",
        message: "invalid input",
      } as IResponse);
    }

    const Todo = ApplicationTodoList.CreateTodo(title, description);

    return res.status(201).send({
      status: "201",
      message: "Todo Created Successfylly",
      data: Todo,
    } as IResponse);
  }
});

router.patch("/update", (req: Request, res: Response) => {
  const { id, state } = req.body;
  if (id && state) {
    const { error } = UpdateTodoValidator(id, state);
    if (error) {
      res.send({
        status: "400",
        message: "invalid input",
      } as IResponse);
    }

    const Todo = ApplicationTodoList.UpdateTodo(id, state);

    res.status(201).send({
      status: "201",
      message: "Todo Updated Successfully",
      data: Todo,
    } as IResponse);
  }
});

router.delete("/delete", (req: Request, res: Response) => {
  const { id } = req.body;
  if (id) {
    const { error } = DeleteTodoValidator(id);
    if (error) {
      res.send({
        status: "400",
        message: "invalid input",
      } as IResponse);
    }

    const UpdateList = ApplicationTodoList.DeleteTodo(id);

    res.status(201).send({
      status: "201",
      message: "Todo Updated Successfully",
      data: UpdateList,
    } as IResponse);
  }
});

export default router;
