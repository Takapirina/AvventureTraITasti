import React, { useEffect, useState } from "react";
import {Pokemon} from "../models/pokemon";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { avanzaIndice } from "../store/gameSlice";
import { calcolaPunteggio } from "../utils/calcolaPunteggio";

import Text from "./Text";
import PokemonImage from "./pokemonImg";
import FeedbackText from "./FeedbackText";

interface ProvaTypingProps {
  pokemon: Pokemon;
}

const ProvaTyping: React.FC<ProvaTypingProps> = ({ pokemon }) => {
  const [word, setWord] = useState<string>("");
  const [isCromatic, setIsCromatic] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [feedbackText, setFeedbackText] = useState<string>("");

  // Timer e gestione del punteggio
  const [seconds, setSeconds] = useState<number>(0);
  const dispatch = useDispatch();

  const combo = useSelector((state: any) => state.game.combo);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "Shift" ||
        e.key === "Control" ||
        e.key === "Alt" ||
        e.key === "CapsLock" ||
        e.key == "ArrowRight" ||
        e.key == "ArrowLeft" ||
        e.key == "ArrowUp" ||
        e.key == "ArrowDown" ||
        e.key == "PageUp" ||
        e.key == "PageDown"
      ) {
        return;
      }

      if (!isRunning) {
        setIsRunning(true);
      }

      switch (e.key) {
        case "Enter":
          handleSubmit();
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
  }, [word, isRunning, pokemon, dispatch, isCromatic, seconds]);

  const handleSubmit = () => {
    setIsRunning(false);
    console.log("Parola digitata:", word);
    console.log("Secondi impiegati:", seconds);
  
    setFeedbackText(
      calcolaPunteggio(dispatch, pokemon, word, seconds, isCromatic, combo)
    );
  
    dispatch(avanzaIndice());
    setWord("");
    setSeconds(0);
  };
  

  // Quando la parola digitata è corretta, esegui la logica di fine prova
  useEffect(() => {
    if (word.toLowerCase() === pokemon.name.toLowerCase()) {
      handleSubmit();
    }
    }, [word, pokemon, dispatch, seconds, isCromatic, combo]);


  // Gestione del timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 0.1);
      }, 100);
    } else {
      if (interval) {
        clearInterval(interval);
      }
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  // Logica cromatica per il Pokémon
  useEffect(() => {
    const random = Math.floor(Math.random() * 256) + 1;
    setIsCromatic(random  <= combo);
  }, [pokemon]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {pokemon.name}
      <FeedbackText key={feedbackText} word={feedbackText} />
      <PokemonImage pokemon={pokemon} isCromatico={isCromatic}/>
      <Text nome={word} />

      <div style={{ marginTop: "10px", fontSize: "20px" }}>
        ⏱️ Tempo: {seconds.toFixed(1)} secondi
      </div>
    </div>
  );
};

export default ProvaTyping;