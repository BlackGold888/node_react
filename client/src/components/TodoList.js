import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';
import Todo from './Todo';

function TodoList() {
    const todos = useSelector((state) => state.todos);

    const [filteredTodos, setFilteredTodos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [todosPerPage] = useState(3);

    const handleStatusFilter = (e) => searchTodos(e.target.checked.toString());
    const handleNameSort = (e) => sortTodos(e.target.value);

    useEffect(() => {
        if (!filteredTodos.length && todos.length) {
            setFilteredTodos(todos);
        }
    })

    const renderButton = () => {
        if (localStorage.getItem('token')) {
            return (
                <>
                    <button className="btn btn-primary" onClick={() => navigate('/add')}>Add Todo</button>
                    <button className="btn btn-primary" onClick={() => logout()}>Logout</button>
                </>
            )
        }else {
            return (
                <button className="btn btn-primary" onClick={() => navigate('/login')}>Login</button>
            )
        }
    }

    const navigate = useNavigate();

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    const sortTodos = (sortBy) => {
        const sortedTodos = [...filteredTodos].sort((a, b) => {
            if (sortBy === 'asc') {
                return a.name > b.name ? 1 : -1;
            }else {
                return a.name < b.name ? 1 : -1;
            }
        });
        setFilteredTodos(sortedTodos);
    }

    const searchTodos = (query) => {
        let tempArr = [];
        query = query.toLowerCase();
        if (query.length > 0) {
            tempArr = filteredTodos.filter(todo =>
                todo.name.toLowerCase().includes(query) ||
                todo.email.toLowerCase().includes(query) ||
                todo.text.toLowerCase().includes(query) ||
                todo.status.toString().toLowerCase().includes(query)
            );
        }else {
            tempArr = [...todos];
        }
        setFilteredTodos(tempArr);
    }

    const renderTodos = () => {
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);
        return currentTodos.map((todo, index) => <Todo key={index} todo={todo} />);
    };
    return (
        <>
            <ul className={ 'todo_container' }>
                <li>
                    <input type="text" onChange={ (e) => searchTodos(e.target.value) } placeholder={ 'search' }/><br/>
                    <label htmlFor="status">Filter By status:</label>
                    <input type="checkbox" id="status" onChange={ (e) => handleStatusFilter(e) }/><br/>
                    <label htmlFor="name_sort_asc">Sort By Name ASC:</label>
                     <input type="radio" name={'name_sort'} value={'asc'} id={'name_sort_asc'} onChange={ (e) => handleNameSort(e) }/><br/>
                    <label htmlFor="name_sort_desc">Sort By Name DESC:</label>
                    <input type="radio" name={'name_sort'} value={'desc'} id={'name_sort_desc'} onChange={ (e) => handleNameSort(e) }/>
                </li>

                { renderTodos() }
            </ul>
            <Pagination
                paginate={ paginate }
                todoPerPage={ todosPerPage }
                totalTodos={ filteredTodos.length }
                currentPage={ currentPage }
            />
            {renderButton()}
        </>

    );
}

export default TodoList;