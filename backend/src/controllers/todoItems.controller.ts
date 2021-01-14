/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Request } from 'express';
import { ITodoItem } from '../types/todoItem';
import TodoList from '../models/todoList';
import TodoItem from '../models/todoItem';

export const getTodoItemById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const itemId = req.params.iid;
  let item;

  try {
    item = await TodoItem.findById(itemId);
  } catch (error) {
    console.log(error);
  }

  res.json({ item: item });
};

export const createTodoItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  const body = req.body as Pick<
    ITodoItem,
    'name' | 'description' | 'creator' | 'listId'
  >;

  const createdItem: ITodoItem = new TodoItem({
    name: body.name,
    description: body.description,
    creator: body.creator,
    status: false,
    listId: body.listId,
  });

  try {
    await createdItem.save();
  } catch (err) {
    console.log(err);
  }

  await TodoList.findOneAndUpdate(
    { listId: body.listId },
    { $push: { items: createdItem } }
  );

  res.status(201).json({ message: 'Item created and added to list!' });
};

export const getTodoItemsByListId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const listId = req.params.listId;

  let items;
  try {
    items = await TodoItem.find({ listId: listId });
    res.json({
      items: items.map(
        (item: { toObject: (arg0: { getters: boolean }) => void }) =>
          item.toObject({ getters: true })
      ),
    });
  } catch (error) {
    console.log(error);
  }
};

export const toggleCompletedTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    TodoItem.findById(req.params.id, function (err: any, todoItem: any) {
      todoItem.status = !todoItem.status;
      todoItem.save(function (err: any) {
        if (err) {
          console.error('ERROR!');
        }
      });
    });

    res.status(201).json({
      message: 'Todo updated',
    });
  } catch (error) {
    console.log(error);
  }
};

export const editTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const editedTodo: ITodoItem | null = await TodoItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(201).json({
      message: 'Todo edited!',
      todo: editedTodo,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedTodo: ITodoItem | null = await TodoItem.findByIdAndRemove(
      req.params.id
    );
    res.status(200).json({
      message: 'Todo deleted',
      todo: deletedTodo,
    });
  } catch (error) {
    console.log(error);
  }
};
