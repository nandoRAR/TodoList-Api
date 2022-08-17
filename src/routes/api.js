import { Router } from 'express';
import * as TodoController from '../controller/todoController';


const router = Router();

router.get('/todo', TodoController.findAllTodo);
router.post('/todo', TodoController.createTodo);
router.put('/todo/:id', TodoController.updateTodo);
router.delete('/todo/:id', TodoController.deleteTodo);

export default router;
