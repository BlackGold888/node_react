import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';
import Todo from './Todo';

function TodoList() {
    const todos = useSelector((state) => state.todos);
    const login = useSelector((state) => state.isLogin);

    const [statusFilter, setStatusFilter] = useState(false);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [todosPerPage] = useState(3);

    const handleStatusFilter = (e) => searchTodos(e.target.checked.toString());

    useEffect(() => {
        if (!filteredTodos.length && todos.length) {
            setFilteredTodos(todos);
            console.log(todos.isLogin);
        }

    })

    const navigate = useNavigate();

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const searchTodos = (query) => {
        let tempArr = [];
        if (query.length > 0) {
            tempArr = filteredTodos.filter(todo => todo.name.includes(query) || todo.email.includes(query) || todo.text.includes(query) || todo.status.toString().includes(query));
        }else {
            tempArr = [...todos];
        }
        setFilteredTodos(tempArr);
    }

    const renderTodos = () => {
        console.log(todos.length);
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);
        return currentTodos.map((todo, index) => <Todo key={index} todo={todo} />);
    };
    return (
        <>
            <ul className={ 'todo_container' }>
                <li>
                    <input type="text" onChange={ (e) => searchTodos(e.target.value) } placeholder={ 'search' }/>
                    Filter By status: <input type="checkbox" onChange={ (e) => handleStatusFilter(e) }/>
                </li>

                { renderTodos() }
            </ul>
            <Pagination
                paginate={ paginate }
                todoPerPage={ todosPerPage }
                totalTodos={ filteredTodos.length }
                currentPage={ currentPage }
            />
            {login.status ? '' : <button onClick={ () => navigate('/login') }>Login</button>}
        </>

    );
}

export default TodoList;