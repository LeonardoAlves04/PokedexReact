import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Pokedex from './components/Pokedex';
import SearchBar from './components/SearchBar';

function App() {
  useEffect(() => {
    console.log("carregou")
  }, [])
  return (
    <div>
      <Navbar />
      <SearchBar />
      <Pokedex />
    </div>
  );
}

export default App;
