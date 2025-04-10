import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListaPokemon } from "../store/gameSlice";

import { getRandomPokemonList } from "../utils/generatorPokemon";

import ProvaTyping from "./ProvaTyping";
import ListNextPokemons from "./ListNextPokemons";

import { pokemonList } from "../models/listaPokemon";
import Pokemon from "../models/pokemon";

const GameMain: React.FC = () => {
  const dispatch = useDispatch();
  const listaPokemon : Pokemon[] = useSelector((state: any) => state.game.listaPokemon);
  const indiceCorrente : number = useSelector((state: any) => state.game.indiceCorrente);

  useEffect(() => {
    if (listaPokemon.length === 0) {
      dispatch(setListaPokemon(pokemonList));
    }
  }, [dispatch, listaPokemon.length]);

  useEffect(() => {
    if (listaPokemon.length - indiceCorrente <= 10) {
      const nuoviPokemon = [...listaPokemon, ...pokemonList];
      dispatch(setListaPokemon(nuoviPokemon));
    }
  }, [dispatch, listaPokemon, indiceCorrente]);

  return (
    <div>
        <ListNextPokemons listPokemons={listaPokemon} />
      <p>Punteggio: {useSelector((state: any) => state.game.punteggio)}</p>
      {listaPokemon.length > 0 && (
        <ProvaTyping pokemon={listaPokemon[indiceCorrente]} />
      )}
    </div>
  );
};

export default GameMain;