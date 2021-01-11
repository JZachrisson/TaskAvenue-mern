import { Router } from 'express';
import {
  getTodoItemsByListId,
  createTodoItem,
  getTodoItemById,
} from '../controllers/todoItems.controller';

const router: Router = Router();

router.get('/:iid', getTodoItemById);
router.get('/list/:listId', getTodoItemsByListId);

router.post('/', createTodoItem);

export default router;
