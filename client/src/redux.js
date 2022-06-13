import { configureStore, createSlice } from '@reduxjs/toolkit';

export const TodoListSlice = createSlice({
    name: 'todoList',
    initialState: {
        todos: [],
        isLogin: {
            status: false,
            token: '',
        },
    },
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        changeLoginStatus: (state, action) => {
            state.isLogin = action.payload
        },
        updateTodo: (state, action) => {
            state.todos = state.todos.map(todo => {
                if (todo.id === action.payload.id) {
                    return action.payload;
                }
                return todo;
            }
            );
        }
    }
})

export const { addTodo, changeLoginStatus, updateTodo } = TodoListSlice.actions;

export const initTodos = async () => {
    const res = await fetch('todos');
    const todos = await res.json();
    todos.forEach(todo => store.dispatch(addTodo(todo)))
}

export const store = configureStore({
    reducer: TodoListSlice.reducer,
})

store.subscribe(() => console.log(store.getState()));