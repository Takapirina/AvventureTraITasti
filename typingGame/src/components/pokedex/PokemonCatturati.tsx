import React from "react";
import { useSelector } from "react-redux";
import MiniSprite from "../miniSprite";

const PokemonCatturati: React.FC = () => {
    const listaPokemonCorretti = useSelector((state: any) => state.game.listaPokemonCorretti);

  const listaOrdinata = [...listaPokemonCorretti].sort((a, b) => a.id - b.id);

  return (
    <>
      <div className="pokedex-data-container">
        {listaPokemonCorretti.length > 0 ? (
          listaOrdinata.map((p, index) => (
            <div key={index} className="pokedex-item">
              <MiniSprite pokemon={p} />
            </div>
          ))
        ) : (
          <div className="pokedex-empty">Nessun Pokémon catturato</div>
        )}
      </div>
    </>
  );
};

export default PokemonCatturati;