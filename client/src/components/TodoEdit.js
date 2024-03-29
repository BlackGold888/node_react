import React, { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateTodo } from '../redux';
import { validateEmail } from '../App';

function TodoEdit() {
    const {state} = useLocation();
    const { name, email, text, id, status } = state ?? {};

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }
    );

    const [newName, setName] = useState(name);
    const [newEmail, setEmail] = useState(email);
    const [newText, setText] = useState(text);
    const [newStatus, setStatus] = useState(status);

    const handleName = (e) => setName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handleText = (e) => setText(e.target.value);
    const handleStatus = (e) => setStatus(e.target.checked);

    const save = () => {
        if (newName.length < 3) {
            toast.error('Мин длина Имени 3 символа');
        } else if (!validateEmail(newEmail)) {
            toast.error('Не корректно введена почта');
        } else if (newText.length < 3) {
            toast.error('Мин длина Текста 3 символа');
        } else {
            fetch('http://localhost:3000/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    name: newName,
                    email: newEmail,
                    text: newText,
                    status: newStatus,
                    id: id
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (!data.status) {
                        toast.error(data.message);
                        navigate('/');
                    } else {
                        toast.success('Задача обновлена');
                        dispatch(updateTodo(data));
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
            <button onClick={ () => save() }>Save</button>
            <button onClick={ () => navigate(-1) }>BACK</button>
        </div>
    );
}

export default TodoEdit;