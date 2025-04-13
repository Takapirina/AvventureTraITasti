import React from "react";
import { PokemonRegistrato } from "../models/pokemon";
import "../style/miniSprite.css";

interface PokemonRegistratoProps {
  pokemon: PokemonRegistrato | null;
  index?: number;
}

const MiniSprite: React.FC<PokemonRegistratoProps> = ({ pokemon, index }) => {
  const spriteUrl = pokemon
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${pokemon.id}.png`
    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${index}.png`;

  const spriteStyle = pokemon
    ? { filter: "none" }
    : { filter: "grayscale(100%) brightness(0.3)" };

  return (
    <div className="mini-sprite-container">
      <div className="ball-background" />
      <div
        className="pokemon-sprite"
        style={{
          backgroundImage: `url(${spriteUrl})`,
          ...spriteStyle,
        }}
      />
      {pokemon && pokemon.isCromatic && (
        <div className="shiny-indicator" title="Cromatico ✨" />
      )}
    </div>
  );
};

export default MiniSprite;