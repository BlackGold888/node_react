import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
        name: 'ssadasd'
    },
    reducers: {
        incremented: (state) => {
            state.value += 1;
        },
        decremented: (state) => {
            state.value -= 1;
        }
    }
});

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
        }
    }
})

export const { addTodo, removeTodo } = TodoListSlice.actions;

export const { incremented, decremented } = counterSlice.actions;

export const store = configureStore({
    reducer: TodoListSlice.reducer,
})

store.subscribe(() => console.log(`Getting data ${ JSON.stringify(store.getState()) }`));

store.dispatch(addTodo({ name: 'BlackGold', email: 'blackgold@gmail.com', text: 'Todo 1', status: false, }))
store.dispatch(addTodo({ name: 'BlackGold', email: 'blackgold@gmail.com', text: 'Todo 2', status: true, }))
store.dispatch(addTodo({ name: 'BlackGold', email: 'blackgold@gmail.com', text: 'Todo 3', status: false, }))
store.dispatch(addTodo({ name: 'BlackGold', email: 'blackgold@gmail.com', text: 'Todo 1', status: true, }))
store.dispatch(addTodo({ name: 'BlackGold', email: 'blackgold@gmail.com', text: 'Todo 1', status: true, }))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={store}>
    <App />
</Provider>
    );
