import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addTodo, store } from '../index';
import ReactPaginate from 'react-paginate';
import Pagination from './Pagination';

function TodoList(props) {
    const todos = useSelector((state) => state.todos)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [text, setText] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [todosPerPage] = useState(3);

    const renderTodos = () => {
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
        return currentTodos.map((todo, index) => <li key={index} className={'todo'}>
            <p>Name: {todo.name}</p>
            <p>Email: {todo.email}</p>
            <p>Text: {todo.text}</p>
            <p>Status: <input type="checkbox" checked={todo.status ?? 'true'} readOnly={true} /></p>
        </li>)
    }

    const handleName = (e) => setName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handleText = (e) => setText(e.target.value);

    const validateEmail = (email) => {
        let re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    function addNewTodo(){
        if (name.length < 3) {
            toast.error('Мин длина Имени 3 символа');
        }else if(validateEmail(email)) {
            toast.error('Не корректно введена почта');
        }else if (text.length < 3) {
            toast.error('Мин длина текста 3 символа');
        }else{
            store.dispatch(addTodo({ name, email, text, status: false, }))
        }
    }

    const paginate = (pageNumber) =>  setCurrentPage(pageNumber);


    return (
        <ul className={'todo_container'}>
            <li>
                <input type="text" onChange={(e) => handleName(e)} placeholder={'Name'}/>
                <input type="text" onChange={(e) => handleEmail(e)} placeholder={'Email'}/>
                <input type="text" onChange={(e) => handleText(e)} placeholder={'Todo text'}/>
                <button onClick={() => addNewTodo()}>Add</button>
            </li>
            {renderTodos()}
            <Pagination paginate={paginate} todoPerPage={todosPerPage} totalTodos={todos.length} currentPage={currentPage} />
        </ul>
    );
}

export default TodoList;