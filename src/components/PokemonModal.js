import React from 'react';

const PokemonModal = ({ show, handleClose, pokemon }) => {
    if (!pokemon) return null;
    const formatSentenceCase = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    return (
        <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content bg-pokemon-light">
                    <div className="modal-header modal-border" >
                        <h5 className="modal-title fw-bold">{formatSentenceCase(pokemon.name)}</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body modal-border">
                        <div className="row"> 
                        <div className="col-md-6 order-md-first">
                        <p className="card-text"><b>Type: </b>{pokemon.type.map((type) => formatSentenceCase(type)).join(', ')}</p>
                        <p className="card-text"><b>Height: </b>{pokemon.height} Dm</p>
                        <p className="card-text"><b>Weight: </b>{pokemon.weight} Hg</p>
                        <p className="card-text"><b>Base Experience: </b>{pokemon.base_experience}</p>
                        <p className="card-text"><b>Abilities:</b> {pokemon.abilities.map((ability) => formatSentenceCase(ability)).join(', ')}</p>
                        </div>
                        <div className="col-md-6 text-center order-first">
                            <img src={pokemon.image} className="img-fluid" alt={pokemon.name} style={{ width: '12rem' }} />
                        </div>
                        <hr />
                        <h4 className="card-text"><b>Moves</b></h4>
                        <p className="card-text">{pokemon.moves.map((move) => formatSentenceCase(move.name)).join(', ')}</p>

                        </div>
                    </div>
                    <div className="modal-footer border-0" >
                        <button type="button" className="btn modal-button" onClick={handleClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonModal;
