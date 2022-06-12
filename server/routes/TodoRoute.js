import express from 'express';
import { getAllTodos } from '../controllers/TodoController.js';
const router = express.Router();

router.get('/todos', getAllTodos);

export { router }