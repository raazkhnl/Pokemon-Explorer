import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="card m-2" style={{ width: '12rem' }}>
      <img src={pokemon.image} className="card-img-top" alt={pokemon.name} />
      <div className="card-body">
        <h5 className="card-title">{pokemon.name}</h5>
        <p className="card-text">Type: {pokemon.type.join(', ')}</p>
      </div>
    </div>
  );
};

export default PokemonCard;
