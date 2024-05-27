import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';
import Spinner from './components/Spinner';
import PokemonModal from './components/PokemonModal';
import Navbar from './components/Navbar';
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
  const [hasMore, setHasMore] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const loadPokemons = useCallback(async () => {
    setIsFetching(true);
    const newPokemons = await fetchPokemonData(20, offset);
    if (newPokemons.length === 0) {
      setHasMore(false);
      setIsFetching(false);
      return;
    }
    const pokemonDetails = await Promise.all(newPokemons.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      const details = await response.json();
      const abilities = details.abilities.map((ability) => ability.ability.name);
      const moves = details.moves.map((move) => ({
        name: move.move.name,
        level: move.version_group_details[0].level_learned_at,
      }));
      return {
        name: details.name,
        image: details.sprites.front_default,
        type: details.types.map((typeInfo) => typeInfo.type.name),
        height: details.height,
        weight: details.weight,
        base_experience: details.base_experience,
        abilities: abilities,
        moves: moves,
      };
    }));
    setPokemons((prevPokemons) => [...prevPokemons, ...pokemonDetails]);
    setIsFetching(false);
  }, [offset]);

  useEffect(() => {
    loadPokemons();
  }, [loadPokemons]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 500 && !isFetching && hasMore) {
      setOffset((prevOffset) => prevOffset + 20);
    }
  }, [isFetching, hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const handleCardClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPokemon(null);
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(keyword.toLowerCase())
  );

  useEffect(() => {
    if (filteredPokemons.length === 0 && keyword !== '' && hasMore && !isFetching) {
      setOffset((prevOffset) => prevOffset + 20);
    }
  }, [filteredPokemons, keyword, hasMore, isFetching]);

  return (
    <>
      <Navbar keyword={keyword} setKeyword={setKeyword} />
      <div className="container">
        <div className="row">
          {filteredPokemons.map((pokemon, index) => (
            <PokemonCard key={index} pokemon={pokemon} onClick={handleCardClick} />
          ))}
        </div>
        {isFetching && <Spinner />}
        {!hasMore && <div className="text-center">No more Pokémon to load</div>}
        <PokemonModal show={showModal} handleClose={handleCloseModal} pokemon={selectedPokemon} />
      </div>
    </>
  );
};

export default App;
