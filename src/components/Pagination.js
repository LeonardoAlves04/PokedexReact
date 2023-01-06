import React from "react"

const Pagination = (props) => {
    const { page, totalPages, onLeftClick, onRightClick } = props
    return (<div className="pagination-container">
        <button className="pagination-button" onClick={onLeftClick}><div>◀</div></button>
        <div>{page} de {totalPages}</div>
        <button className="pagination-button" onClick={onRightClick}><div>▶</div></button>
    </div>)
}

export default Pagination