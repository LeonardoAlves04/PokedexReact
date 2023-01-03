import React, { useContext } from "react"
import FavoriteContext from "./contexts/favoriteContext"

const Navbar = () => {
    const { favoritePokemons } = useContext(FavoriteContext);
    return (
        <nav>
            <div >
                <img className="navbar-img" src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="pokeapilogo" />
            </div>
            <div>{favoritePokemons.length}❤️</div>
        </nav>
    )
}

export default Navbar