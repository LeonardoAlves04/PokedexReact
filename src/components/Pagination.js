import React from "react"

const Pagination = (props) => {
    const { page, totalPages, onPreviousClick, onNextClick } = props
    return (<div className="pagination-container">
        <button onClick={onPreviousClick}><div>◀</div></button>
        <div>{page} de {totalPages}</div>
        <button onClick={onNextClick}><div>▶</div></button>
    </div>)
}

export default Pagination