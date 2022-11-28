import React from "react";
import './Pagination.css';

function Pagination ({recipesPerPage, recipes, paginationConst}){
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(recipes/recipesPerPage); i++) {
        pageNumbers.push(i+1);
    }

    return(
        <nav>
            <>
                { pageNumbers && 
                    pageNumbers.map(number => (                    
                    <button className="buttonPag" onClick={() => paginationConst(number)}>{number}</button>
                ))}
            </>
        </nav>
    )
}

export default Pagination;