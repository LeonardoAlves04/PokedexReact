import React, { useState } from "react";

const SearchBar = (props) => {
    const [search, setSearch] = useState("dito")
    const [pokemon, setPokemon] = useState("")
    const { onSearchHandler } = props
    const onChangeHandler = (e) => {
        setSearch(e.target.value)
        if (e.target.value === 0) {
            onSearchHandler(undefined)
        }
    }

    const onButtonClickHandler = () => {
        onSearchHandler(search)
    }

    return (
        <div className="searchbar-container">
            <div className="searchbar">
                <input placeholder="Buscar pokemon" onChange={onChangeHandler} />
            </div>
            <div className="searchbar-btn">
                <button onClick={onButtonClickHandler}> Buscar </button>
            </div>

            {pokemon ? (<div>
                <div>Nome: {pokemon.name} </div>
                <div>Peso: {pokemon.weight + " kg"}</div>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            </div>
            ) : null}
        </div>
    )
}
export default SearchBar;