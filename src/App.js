import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';
import './App.css';

const fetchPokemonData = async (limit, offset) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  const data = await response.json();
  return data.results;
};

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [offset, setOffset] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const loadPokemons = useCallback(async () => {
    setIsFetching(true);
    const newPokemons = await fetchPokemonData(20, offset);
    const pokemonDetails = await Promise.all(newPokemons.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      const details = await response.json();
      return {
        name: details.name,
        image: details.sprites.front_default,
        type: details.types.map((typeInfo) => typeInfo.type.name),
      };
    }));
    setPokemons((prevPokemons) => [...prevPokemons, ...pokemonDetails]);
    setIsFetching(false);
  }, [offset]);

  useEffect(() => {
    loadPokemons();
  }, [loadPokemons]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) {
      return;
    }
    setOffset((prevOffset) => prevOffset + 20);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="container">
      <SearchBar keyword={keyword} setKeyword={setKeyword} />
      <div className="d-flex flex-wrap justify-content-center">
        {filteredPokemons.map((pokemon, index) => (
          <PokemonCard key={index} pokemon={pokemon} />
        ))}
      </div>
      {isFetching && <div>Loading more Pokémon...</div>}
    </div>
  );
};

export default App;
