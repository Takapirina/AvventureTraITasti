import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PokemonRegistrato } from '../models/pokemon';
import { resetGame } from '../store/gameSlice';

import "../style/gameEnd.css"
import Text from '../components/Text';
import Punteggio from '../components/Punteggio';
import { Partita } from '../models/pokemon';

const PlayerForm: React.FC = () => {
  const [name, setName] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const dispatch = useDispatch();

  const listaCattura: PokemonRegistrato[] = useSelector(
    (state: any) => state.game.listaSpecieCatturate
  );
  const punteggio: number = useSelector((state: any) => state.game.punteggio);

  const padId = (id: number) => id.toString().padStart(4, '0');

  const selectedPokemon = listaCattura[selectedIndex];
  const paddedId = padId(selectedPokemon.id);
  const imgUrl = selectedPokemon.isCromatic
    ? `https://raw.githubusercontent.com/PMDCollab/SpriteCollab/master/portrait/${paddedId}/0000/0001/Normal.png`
    : `https://raw.githubusercontent.com/PMDCollab/SpriteCollab/master/portrait/${paddedId}/Normal.png`;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev - 1 + listaCattura.length) % listaCattura.length);
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev + 1) % listaCattura.length);
      } else if (e.key === 'Enter') {
        if (!listaCattura[selectedIndex] || name.length === 0) return;

        const partita: Partita = {
          nome: name,
          urlImg: imgUrl,
          punteggio,
          pokemonCatturati: listaCattura.length,
        };
        console.log('partita: '+partita)
        dispatch(resetGame());
      } else if (e.key === 'Backspace') {
        setName((prev) => prev.slice(0, -1));
      } else if (e.key.length === 1 && name.length < 10) {
        setName((prev) => prev + e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [name, selectedIndex, listaCattura, punteggio, dispatch]);

  return (
    <div className="player-form">

      {listaCattura.length > 0 && (
          <div className="pokemon-img-container" style={{ backgroundImage: `url(${imgUrl})`}}></div>
      )}
      <Text nome={name}/>
      <Punteggio />
    </div>
  );
};

export default PlayerForm;