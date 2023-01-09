import React, { useState } from "react";
import Pokeball from "./pokeball.png"


const SearchBar = (props) => {
    const [search, setSearch] = useState("");
    const { onSearch } = props
    const onChangeHandler = (e) => {
        setSearch(e.target.value)
        if (e.target.value.length === 0) {
            onSearch(undefined)
        }
    }

    const onButtonClickHandler = () => {
        onSearch(search)
    }

    return (
        <div className="searchbar-container">
            <div className="searchbar">
                <input placeholder="Buscar pokemon" onChange={onChangeHandler} />
            </div>
            <div className="searchbar-btn">
                <button onClick={onButtonClickHandler}> <img alt="pokeball" className="pokeball-image" src={Pokeball} /> </button>
            </div>
        </div>
    )
}
export default SearchBar;