import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Pokedex from './components/Pokedex';
import SearchBar from './components/SearchBar';
import { getPokemon, getPokemonData, searchPokemon } from './components/api';
import { FavoriteProvider } from './components/contexts/favoriteContext';

function App() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const itensPerPage = 24;
  const favoritesKey = "f"

  // function lowerCaseSearch(searchValue) {
  //   pokemons.filter((pokemon) => {
  //     const titleNormalized = pokemon.title.toLoweCase();
  //     const searchValueNormalized = searchValue.toLoweCase();
  //     return titleNormalized.includes(searchValueNormalized)
  //   })
  // } isso é oq fiz no alura tub pra conseguir pesquisar com letras maiusculas e minusculas

  const fetchPokemons = async () => {
    try {
      setLoading(true)
      setNotFound(false)
      const data = await getPokemon(itensPerPage, itensPerPage * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
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

  const onSearchHandler = async (pokemon) => {
    if (!pokemon) {
      return fetchPokemons()
    }

    setLoading(true)
    setNotFound(false)
    const result = await searchPokemon(pokemon)
    if (!result) {
      setNotFound(true)
    } else {
      setPokemons([result])
    }
    setLoading(false)
    setPage(0)
    setTotalPages(1)
  }

  return (
    <FavoriteProvider value={{
      favoritePokemons: favorites,
      updateFavoritePokemons: updateFavoritePokemons
    }}>
      <div>
        <Navbar />
        <SearchBar onSearch={onSearchHandler} />
        {notFound ? (<div className="not-found-text">Ta viajando meu parceiro, esse pokemon não existe!</div>
        ) :
          (<Pokedex
            pokemons={pokemons}
            loading={loading}
            page={page}
            setPage={setPage}
            totalPages={totalPages} />)}
      </div>
    </FavoriteProvider>
  );
}

export default App;
