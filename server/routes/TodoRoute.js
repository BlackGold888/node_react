import express from 'express';
import { addTodo, getAllTodos, updateTodo } from '../controllers/TodoController.js';
import { auth } from '../middleware/Auth.js';

const router = express.Router();

router.get('/todos', getAllTodos);
router.post('/addTodo', addTodo);
router.post('/edit', auth, updateTodo);

export { router }
