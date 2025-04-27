import React from 'react';
import PlayerForm from './PlayerForm';
import PokemonCatturati from '../components/pokedex/PokemonCatturati';

const GameOver: React.FC = () => {

  return (
    <div className="game-over">
      <PlayerForm />
      <PokemonCatturati />
    </div>
  );
};

export default GameOver;