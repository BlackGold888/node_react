import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

export const TodoListSlice = createSlice({
    name: 'todoList',
    initialState: {
        todos: [],
    },
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        removeTodo: (state, action) => {
            state.todos.splice(action.payload, 1);
        },
    }
})

export const { addTodo, removeTodo, todosInit } = TodoListSlice.actions;

export const initTodos = async () => {
    const res = await fetch('/todos');
    const todos = await res.json();
    todos.forEach(todo => store.dispatch(addTodo(todo)))
}

export const store = configureStore({
    reducer: TodoListSlice.reducer,
})
store.dispatch(initTodos)

store.subscribe(() => console.log(`Getting data ${ JSON.stringify(store.getState()) }`));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={ store }>
        <App/>
    </Provider>
);
