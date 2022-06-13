import React from 'react';
import { useNavigate } from 'react-router-dom';

function Todo({ index, todo }) {
    const navigate = useNavigate();

    const renderEditButton = () => {
        if (localStorage.getItem('token')) {
            return (
                <button className={'btn-edit'} onClick={ () => navigate('/edit', { state: { ...todo } }) }>EDIT</button>
            )
        }
    }

    const renderMarker = () => {
        if (todo.status) {
            return (
                <>
                    <span className={'marker'}>Выполнено &#10004;</span>
                    <span className={'marker'}>отредактировано администратором &#10004;</span>
                </>
            )
        }
    }

    return (
        <>
            <li key={ index } className={ 'todo' }>
                { renderMarker() }
                <p>Name: { todo.name }</p>
                <p>Email: { todo.email }</p>
                <p>Text: { todo.text }</p>
                <p>Status: <input type="checkbox" checked={ todo.status } readOnly={ true }/></p>
                {renderEditButton() }
            </li>
        </>
    );
}

export default Todo;