import React from "react";
import { useSelector } from "react-redux";
import { PokemonRegistrato } from "../../models/pokemon";
import MiniSprite from "../miniSprite";

interface PokedexProps {
  title: string;
  startId: number;
  endId: number;
}

const Pokedex: React.FC<PokedexProps> = ({ title, startId, endId }) => {
  const listaCattura: PokemonRegistrato[] = useSelector((state: any) => state.game.listaSpecieCatturate);

  // Creo l'array 'pokedex' in modo immutabile
  const pokedex = new Array(endId - startId + 1).fill(null).map((_, index) => {
    const pokemon = listaCattura.find(p => p.id === startId + index);
    return pokemon || null;
  });

  return (
    <>
    <div className="pokedex-name">{title}</div>
    <div className="pokedex-data-container">
      {pokedex.map((p, index) => (
        <div key={index} className="pokedex-item">
          {p ? (
            <MiniSprite pokemon={p} />
          ) : (
            <MiniSprite pokemon={null} index={startId + index} />
          )}
        </div>
      ))}
    </div>
    </>
  );
};

export default Pokedex;