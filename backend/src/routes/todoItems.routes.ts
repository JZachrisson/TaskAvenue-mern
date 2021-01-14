import { Router } from 'express';
import {
  getTodoItemsByListId,
  createTodoItem,
  getTodoItemById,
  deleteTodo,
  toggleCompletedTodo,
  editTodo,
} from '../controllers/todoItems.controller';

const router: Router = Router();

router.get('/:iid', getTodoItemById);
router.get('/list/:listId', getTodoItemsByListId);

router.post('/', createTodoItem);

router.delete('/:id', deleteTodo);

router.put('/toggle/:id', toggleCompletedTodo);
router.put('/edit/:id', editTodo);

export default router;
