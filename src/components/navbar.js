import React, { useContext } from "react"
import FavoriteContext from "./contexts/favoriteContext"

const Navbar = () => {
    const { favoritePokemons } = useContext(FavoriteContext);
    return (
        <nav>
            <div >
                <a href="https://pokeapi.co/about">  <img className="navbar-img" src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="pokeapilogo" /></a>
            </div>

            <div className="amount-favorite">
                {favoritePokemons.length}❤️
            </div>

        </nav >
    )
}

export default Navbar