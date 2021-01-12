import { Router } from 'express';
import {
  createTodoList,
  getTodoListbyId,
} from '../controllers/todoLists.controller';

const router: Router = Router();

router.get('/:lid', getTodoListbyId);
router.post('/', createTodoList);

export default router;
