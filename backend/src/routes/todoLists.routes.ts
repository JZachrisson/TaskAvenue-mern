import { Router } from 'express';
import createTodoList from '../controllers/todoLists.controller';

const router: Router = Router();

router.post('/', createTodoList);

export default router;
