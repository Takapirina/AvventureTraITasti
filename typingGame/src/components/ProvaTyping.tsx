import React, { useEffect, useState } from "react";
import Pokemon from "../models/pokemon";
import { useDispatch } from "react-redux";
import { aggiornaPunteggio, avanzaIndice } from "../store/gameSlice";

import '../style/mainPokemon.css'

//importo utils per calcolare il punteggio
import { getSimilarity } from "../utils/calcolaPunteggio";

interface ProvaTypingProps {
  pokemon: Pokemon;
}

const ProvaTyping: React.FC<ProvaTypingProps> = ({ pokemon }) => {
  const [word, setWord] = useState<string>("");

  const dispatch = useDispatch();
  const [animationKey, setAnimationKey] = useState<number>(0);
  const [isCromatic, setIsCromatic] = useState<boolean>(false);

  // timer interno
  const [intervalId, setIntervalId] = useState<number>(0);


  useEffect(() => {

    const handleKeyDown = (e: KeyboardEvent) => {

      if (intervalId<=0) {
        setInterval(() => {
          setIntervalId(intervalId+1);
        }, 1000); // ogni secondo
      }

      if (
        e.key === "Shift" ||
        e.key === "Control" ||
        e.key === "Alt" ||
        e.key === "CapsLock"
      ) {
        return;
      }

      switch (e.key) {
        case "Enter":
          console.log("Parola digitata:", word);
          // gestione timer
          console.log(intervalId);
          setIntervalId(0);

          // gestione punteggio
          let punteggio = Math.round(( pokemon.name.length * 100 ) * getSimilarity(word, pokemon.name));
          isCromatic ? dispatch(aggiornaPunteggio(punteggio * 5)) : dispatch(aggiornaPunteggio(punteggio));

          dispatch(avanzaIndice());
          setWord("");
          break;
        case "Backspace":
          setWord((prev) => prev.slice(0, -1));
          break;
        default:
          setWord((prev) => prev + e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [word]);

  useEffect(() => {
    setAnimationKey(prevKey => prevKey + 1);
      //logica per decreatare la cromaticità della specie
      let random: number = Math.floor(Math.random() * 64) + 1;
      setIsCromatic(random >= 32 );
      console.log(random);
  }, [pokemon]);

  const spriteUrl = isCromatic
  ? `url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.id}.png)`
  : `url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png)`;


  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    }}>
      <h2>{pokemon.name}</h2>
      <div key={animationKey}
        className="mainPokemon"
        style={{
          height: "200px",
          width: "200px",
          backgroundImage: spriteUrl,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: 'no-repeat',
        }}
      />
      <p style={{ fontSize: "2rem" }}>{word}</p>
      {isCromatic && (
        <div className="sparkle-effect" />
      )}
    </div>
  );
};

export default ProvaTyping;