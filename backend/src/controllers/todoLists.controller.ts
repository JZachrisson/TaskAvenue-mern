import { Response, Request } from 'express';
import { ITodoList } from '../types/todoList';
import TodoList from '../models/todoList';

const createTodoList = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<ITodoList, 'name' | 'listId' | 'creator'>;

    const createdTodoList: ITodoList = new TodoList({
      name: body.name,
      listId: body.listId,
      creator: body.creator,
    });

    await createdTodoList.save();
    res.status(201).json({ todoList: createdTodoList });
  } catch (err) {
    console.log(err);
  }
};

export default createTodoList;
