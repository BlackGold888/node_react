import React, { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux';
import { validateEmail } from '../App';

function TodoAdd() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }
    );

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [text, setText] = useState('');
    const [status, setStatus] = useState(false);

    const handleName = (e) => setName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handleText = (e) => setText(e.target.value);
    const handleStatus = (e) => setStatus(e.target.checked);

    const saveTodo = () => {
        if (name.length < 3) {
            toast.error('Мин длина Имени 3 символа');
        } else if (!validateEmail(email)) {
            toast.error('Не корректно введена почта');
        } else if (text.length < 3) {
            toast.error('Мин длина Текста 3 символа');
        } else {
            fetch('http://localhost:3000/addTodo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    text: text,
                    status: status,
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (!data.status) {
                        toast.error(data.message);
                        navigate('/');
                    } else {
                        toast.success('Задача добавлена');
                        dispatch(addTodo(data));
                        navigate('/');
                    }
                });
        }
    }

    return (
        <div className={'todo-add'}>
            <input type="text" onChange={ (e) => handleName(e) } defaultValue={name} placeholder={ 'Name' }/>
            <input type="text" onChange={ (e) => handleEmail(e) } defaultValue={email} placeholder={ 'Email' }/>
            <input type="text" onChange={ (e) => handleText(e) } defaultValue={text} placeholder={ 'Todo text' }/>
            Status: <input type="checkbox" onChange={ (e) => handleStatus(e) } defaultChecked={status}/>
            <button onClick={ () => saveTodo() }>Save</button>
            <button onClick={ () => navigate(-1) }>BACK</button>
        </div>
    );
}

export default TodoAdd;