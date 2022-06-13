import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Todo({ index, todo }) {
    const navigate = useNavigate();
    const login = useSelector((state) => state.isLogin);

    return (
        <>
            <li key={ index } className={ 'todo' }>
                <p>Name: { todo.name }</p>
                <p>Email: { todo.email }</p>
                <p>Text: { todo.text }</p>
                <p>Status: <input type="checkbox" checked={ todo.status } readOnly={ true }/></p>
                {login.status ? <button className={'btn-edit'} onClick={ () => navigate('/edit', { state: { ...todo } }) }>EDIT</button> : '' }
            </li>
        </>
    );
}

export default Todo;