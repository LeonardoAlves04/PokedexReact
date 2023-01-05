import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Pokedex from './components/Pokedex';
import SearchBar from './components/SearchBar';
import { getPokemon, getPokemonData } from './components/api';
import { FavoriteProvider } from './components/contexts/favoriteContext';

function App() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const itensPerPage = 27;
  const favoritesKey = "f"

  const fetchPokemons = async () => {
    try {
      setLoading(true)
      const data = await getPokemon(itensPerPage, itensPerPage * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url)
      });

      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
      setTotalPages(Math.ceil(data.count / itensPerPage))
    } catch (error) {
      console.log("fetch Pokemons error: ", error)
    }
  }

  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(favoritesKey)) || []
    setFavorites(pokemons)
  }

  useEffect(() => {
    loadFavoritePokemons();
  }, [])

  useEffect(() => {
    fetchPokemons();
  }, [page])

  const updateFavoritePokemons = (name) => {
    const updateFavorites = [...favorites]
    const favoriteIndex = favorites.indexOf(name)
    if (favoriteIndex >= 0) {
      updateFavorites.splice(favoriteIndex, 1)
    } else {
      updateFavorites.push(name);
    }
    window.localStorage.setItem(favoritesKey, JSON.stringify(updateFavorites))
    setFavorites(updateFavorites);
  }

  return (
    <FavoriteProvider value={{
      favoritePokemons: favorites,
      updateFavoritePokemons: updateFavoritePokemons
    }}>
      <div>
        <Navbar />
        <SearchBar />
        <Pokedex
          pokemons={pokemons}
          loading={loading}
          page={page}
          setPage={setPage}
          totalPages={totalPages} />
      </div>
    </FavoriteProvider>
  );
}

export default App;
