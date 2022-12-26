import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Pokedex from './components/Pokedex';
import SearchBar from './components/SearchBar';
import { getPokemon } from './components/api';

function App() {
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);

  const fetchPokemons = async () => {
    try {
      setLoading(true)
      const result = await getPokemon();
      setPokemons(result);
      setLoading(false);
    } catch (error) {
      console.log("fetch Pokemons error: ", error)
    }
  }

  useEffect(() => {
    console.log("carregou")
    fetchPokemons()
  }, [])

  return (
    <div>
      <Navbar />
      <SearchBar />
      <Pokedex pokemons={pokemons} loading={loading} />
    </div>
  );
}

export default App;
