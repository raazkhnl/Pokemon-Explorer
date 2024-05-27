import React from 'react';

const PokemonCard = ({ pokemon, onClick }) => {
    const formatSentenceCase = (text) => {
      return text.charAt(0).toUpperCase() + text.slice(1);
    };
  
    return (
      <div className="col-12 col-sm-6 col-md-3 mb-4">
        <div className="card  pokemon-card shadow h-100" style={{ cursor: 'pointer' }} onClick={() => onClick(pokemon)}>
        <img src={pokemon.image} className="card-img-top img-fluid m-auto " alt={pokemon.name} style={{ width: '12rem'}}/>
        <div className="card-body">
          <h3 className="card-title fw-bold pb-2">{formatSentenceCase(pokemon.name)}</h3>
          <p className="card-text"><b>Type: </b>{pokemon.type.map((type) => formatSentenceCase(type)).join(', ')}</p>
          <p className="card-text"><b>Height: </b>{pokemon.height} Dm</p>
          <p className="card-text"><b>Weight: </b>{pokemon.weight} Hg</p>
          <p className="card-text"><b>Base Experience: </b>{pokemon.base_experience}</p>
          <p className="card-text"><b>Abilities: </b>{pokemon.abilities.map((ability) => formatSentenceCase(ability)).join(', ')}</p>
        </div>
      </div>
      </div>
    );
  };

export default PokemonCard;
