import React from "react"
import { useState, useEffect } from "react";
import {Pokemon}from "../models/pokemon";
import "../style/mainPokemon.css";
import "../style/shiny.css";


interface pokemonImageProp {
    pokemon: Pokemon;
    isCromatico: boolean;
}

const PokemonImage : React.FC<pokemonImageProp> = ({pokemon, isCromatico}) => {

    const [animationKey, setAnimationKey] = useState<number>(0);

    useEffect(() => {
        setAnimationKey((prevKey) => prevKey + 1);
      }, [pokemon]);

      const spriteUrl = isCromatico
    ? `url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.id}.png)`
    : `url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png)`;

    return (
        <div className="pokemonImageContainer">
            {isCromatico && <div key={`field-${animationKey}`} className="pokemon-field">
                {[...Array(6)].map((_, i) => (
                    <div key={`stella-${i}`} className="stella" />
                ))}
                </div>}
            <div
                key={animationKey}
                className="mainPokemon"
                style={{
                height: "250px",
                width: "250px",
                backgroundImage: spriteUrl,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                }}
            >
            </div>
        </div>
    )
}

export default PokemonImage;