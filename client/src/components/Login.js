import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { store } from '../redux';
import { useNavigate } from 'react-router-dom';
import { changeLoginStatus } from '../redux';

function TodoAdd(props) {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => setLogin(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const signIn = () => {
        if (login.length < 3) {
            toast.error('Мин длина логина 3 символа');
        }  else if (password.length < 3) {
            toast.error('Мин длина пароля 3 символа');
        } else {
            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    login,
                    password,
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        toast.error(data.error);
                    } else {
                        store.dispatch(changeLoginStatus(data));
                        navigate('/');
                    }
                });
            // store.dispatch(addTodo({ name, email, text, status: false, }));
            // toast.success('Задача добавлена');
        }
    }

    return (
        <div className={'todo-add'}>
            <input type="text" onChange={ (e) => handleLogin(e) } placeholder={ 'Login' }/>
            <input type="text" onChange={ (e) => handlePassword(e) } placeholder={ 'Pass' }/>
            <button onClick={ () => signIn() }>Login</button>
            <button onClick={ () => navigate(-1) }>BACK</button>
        </div>
    );
}

export default TodoAdd;