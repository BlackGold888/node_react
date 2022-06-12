import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { addTodo, store } from '../index';
import { useNavigate } from 'react-router-dom';

function TodoAdd(props) {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [text, setText] = useState('');

    const handleName = (e) => setName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handleText = (e) => setText(e.target.value);

    const validateEmail = (email) => {
        let re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const addNewTodo = () => {
        if (name.length < 3) {
            toast.error('Мин длина Имени 3 символа');
        } else if (!validateEmail(email)) {
            toast.error('Не корректно введена почта');
        } else if (text.length < 3) {
            toast.error('Мин длина Текста 3 символа');
        } else {
            store.dispatch(addTodo({ name, email, text, status: false, }));
            toast.success('Задача добавлена');
        }
    }

    return (
        <div className={'todo-add'}>
            <input type="text" onChange={ (e) => handleName(e) } placeholder={ 'Name' }/>
            <input type="text" onChange={ (e) => handleEmail(e) } placeholder={ 'Email' }/>
            <input type="text" onChange={ (e) => handleText(e) } placeholder={ 'Todo text' }/>
            <button onClick={ () => addNewTodo() }>Add</button>
            <button onClick={ () => navigate(-1) }>BACK</button>
        </div>
    );
}

export default TodoAdd;