import { db } from '../models/index.js';

const getAllTodos = async (req, res) => {
    const todos = await db.Todo.findAll();
    res.status(200).json(todos);
}

const addTodo = async (req, res) => {
    const { name, email, text, status } = req.body;
    const todo = await db.Todo.create({
        name,
        email,
        text,
        status
    });
    res.status(200).json(todo);
    console.log(name, email, text, status);
}

const updateTodo = async (req, res) => {
    const { id, name, email, text, status } = req.body;
    console.log(id, name, email, text, status);
    const todo = await db.Todo.update({
        name,
        email,
        text,
        status
    }, {
        where: { id }

    });
    res.status(200).json({ id, name, email, text, status });
}

export { getAllTodos, addTodo, updateTodo }