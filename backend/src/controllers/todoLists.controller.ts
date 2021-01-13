import { Response, Request } from 'express';
import { ITodoList } from '../types/todoList';
import TodoList from '../models/todoList';

export const getTodoListsByUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user = req.params.user;

  let lists;
  try {
    lists = await TodoList.find({ creator: user });
    res.json({
      lists: lists.map(
        (list: { toObject: (arg0: { getters: boolean }) => void }) =>
          list.toObject({ getters: true })
      ),
    });
  } catch (error) {
    console.log(error);
  }
};

export const getTodoListbyId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const listId = req.params.lid;
  let list;
  try {
    list = await TodoList.findOne({ listId: listId });
  } catch (error) {
    console.log(error);
  }
  res.json({ list: list });
};

export const createTodoList = async (
  req: Request,
  res: Response
): Promise<void> => {
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
