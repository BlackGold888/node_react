import React from 'react';

function Todo({ index, todo }) {
    return (
        <>
            <li key={ index } className={ 'todo' }>
                <p>Name: { todo.name }</p>
                <p>Email: { todo.email }</p>
                <p>Text: { todo.text }</p>
                <p>Status: <input type="checkbox" checked={ todo.status } readOnly={ true }/></p>
            </li>
        </>
    );
}

export default Todo;