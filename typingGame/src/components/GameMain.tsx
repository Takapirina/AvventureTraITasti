import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListaPokemon } from "../store/gameSlice";

import ProvaTyping from "./ProvaTyping";
import ListNextPokemons from "./ListNextPokemons";
import Punteggio from "./Punteggio";

import { pokemonList } from "../models/listaPokemon";
import { getRandomPokemonList } from "../utils/generatorPokemon";
import { Pokemon } from "../models/pokemon";
import ComboText from "./comboText";
import "../style/mainGame.css";
import Pokedex from "./pokedex/Pokedex";
//import Incubatori from "./Incubatori";

const regioni = [
  { title: "Kanto", startId: 1, endId: 151 },
  { title: "Johto", startId: 152, endId: 251 },
  { title: "Hoenn", startId: 252, endId: 386 },
  { title: "Sinnoh", startId: 387, endId: 493 },
  { title: "Unima", startId: 494, endId: 649 },
  { title: "Kalos", startId: 650, endId: 721 },
  { title: "Alola", startId: 722, endId: 809 },
  { title: "Galar", startId: 810, endId: 905 },
  { title: "Paldea", startId: 906, endId: 1025 },
];

const GameMain: React.FC = () => {
  const dispatch = useDispatch();
  const listaPokemon: Pokemon[] = useSelector((state: any) => state.game.listaPokemon);
  const indiceCorrente: number = useSelector((state: any) => state.game.indiceCorrente);
  const [generazioneAttiva, setGenerazioneAttiva] = useState("Kanto");

  useEffect(() => {
    if (listaPokemon.length === 0) {
      dispatch(setListaPokemon(pokemonList));
    }
  }, [dispatch, listaPokemon.length]);

  useEffect(() => {
    const fetchPokemon = async () => {
      if (listaPokemon.length - indiceCorrente <= 10) {
        const nuovaListaPokemon: Pokemon[] = await getRandomPokemonList();
        const nuoviPokemon = [...listaPokemon, ...nuovaListaPokemon];
        dispatch(setListaPokemon(nuoviPokemon));
      }
    };

    fetchPokemon();
  }, [dispatch, listaPokemon, indiceCorrente]);

  const handleArrowPress = useCallback((event: KeyboardEvent) => {
    const currentIndex = regioni.findIndex((r) => r.title === generazioneAttiva);

    if (event.key === "ArrowLeft") {
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : regioni.length - 1;
      setGenerazioneAttiva(regioni[prevIndex].title);
    }

    if (event.key === "ArrowRight") {
      const nextIndex = (currentIndex + 1) % regioni.length;
      setGenerazioneAttiva(regioni[nextIndex].title);
    }
  }, [generazioneAttiva]);

  useEffect(() => {
    window.addEventListener("keydown", handleArrowPress);
    return () => {
      window.removeEventListener("keydown", handleArrowPress);
    };
  }, [handleArrowPress]);

  const generazione = regioni.find(r => r.title === generazioneAttiva);

  return (
    <div className="main-page">
      <div className="leaderboard">
        <p>leaderboard</p>
      </div>
      <ListNextPokemons listPokemons={listaPokemon} />
      <div className="typingboard">
        <div className="data-container"
        style={{
          display:'flex', justifyContent: 'space-around'
        }}>
        <ComboText />
        <Punteggio />
        </div>
        {listaPokemon.length > 0 && (
          <ProvaTyping pokemon={listaPokemon[indiceCorrente]} />
        )}
      </div>

      <div className="collectionboard">
        {generazione && (
          <Pokedex
            key={generazione.title}
            title={generazione.title}
            startId={generazione.startId}
            endId={generazione.endId}
          />
        )}
      </div>
    </div>
  );
};

export default GameMain;