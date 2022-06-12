import React from 'react';

function Pagination({ todoPerPage, totalTodos, paginate, currentPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalTodos / todoPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <ul className={ 'pagination' }>
                { pageNumbers.map(number => (
                    <li key={ number } className={ currentPage === number ? 'page-item current-page' : 'page-item' }>
                        <a onClick={ () => paginate(number) } className={ 'page-link' }>
                            { number }
                        </a>
                    </li>
                )) }
            </ul>
        </div>
    );
}

export default Pagination;