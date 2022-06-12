import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';

function TodoList() {
    const todos = useSelector((state) => state.todos);
    const [filteredTodos, setFilteredTodos] = useState(todos);
    const [currentPage, setCurrentPage] = useState(1);
    const [todosPerPage] = useState(3);

    const navigate = useNavigate();

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const searchTodos = (query) => {
        let tempArr = [];
        if (query.length > 0) {
            tempArr = filteredTodos.filter(todo => todo.name.includes(query) || todo.email.includes(query) || todo.text.includes(query));
        }else {
            tempArr = [...todos];
        }
        console.log(tempArr.length);
        setFilteredTodos(tempArr);
    }

    const renderTodos = () => {
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);
        return currentTodos.map((todo, index) => <li key={ index } className={ 'todo' }>
            <p>Name: { todo.name }</p>
            <p>Email: { todo.email }</p>
            <p>Text: { todo.text }</p>
            <p>Status: <input type="checkbox" checked={ todo.status } readOnly={ true }/></p>
        </li>);
    };
    return (
        <>
            <ul className={ 'todo_container' }>
                <li>
                    <input type="text" onChange={ (e) => searchTodos(e.target.value) } placeholder={ 'search' }/>
                </li>
                { renderTodos() }
            </ul>
            <Pagination
                paginate={ paginate }
                todoPerPage={ todosPerPage }
                totalTodos={ todos.length }
                currentPage={ currentPage }
            />
            <button onClick={() => navigate('/add')}>Add new Todo</button>
        </>

    );
}

export default TodoList;