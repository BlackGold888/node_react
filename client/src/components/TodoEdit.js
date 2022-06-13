import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { updateTodo } from '../redux';

function TodoEdit() {
    const {state} = useLocation();
    const dispatch = useDispatch();
    const { name, email, text, id, status } = state;

    const navigate = useNavigate();
    const [newName, setName] = useState(name);
    const [newEmail, setEmail] = useState(email);
    const [newText, setText] = useState(text);
    const [newStatus, setStatus] = useState(status);

    const handleName = (e) => setName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handleText = (e) => setText(e.target.value);
    const handleStatus = (e) => setStatus(e.target.checked);

    const validateEmail = (email) => {
        let re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

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
                    if (data.error) {
                        toast.error(data.error);
                    } else {
                        console.log(data);
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