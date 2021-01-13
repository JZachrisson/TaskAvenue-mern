import { Router } from 'express';
import {
  createTodoList,
  getTodoListbyId,
  getTodoListsByUser,
} from '../controllers/todoLists.controller';

const router: Router = Router();

router.get('/user/:user', getTodoListsByUser);
router.get('/:lid', getTodoListbyId);
router.post('/', createTodoList);

export default router;
