import React from 'react';
import './Pagination.scss';

const Pagination = ({ countriesPerPage, totalCoutries, paginate, currentPage }) => {
    const pageNumbers = []
    //console.log(countriesPerPage, cards)
    //const totalCoutries = cards.length
    // const numbers = Math. ceil(totalCoutries/countriesPerPage)

    for (let i = 1; i <= Math.ceil(totalCoutries/countriesPerPage); i++) {
        pageNumbers.push(i)
        
    }

    return (
        <div>
            <div className="pagination">
                { pageNumbers.map(number => (
                        <button className={currentPage === number ? 'page-item page-current' : 'page-item'} key={number}  onClick={() => paginate(number)}>{number}</button>

                ))}
            </div>
        </div>
    )
}

export default Pagination;