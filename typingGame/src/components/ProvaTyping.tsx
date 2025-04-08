import React, { useEffect, useState } from "react";
import Pokemon from "../models/pokemon";
import { useDispatch } from "react-redux";
import { aggiornaPunteggio, avanzaIndice } from "../store/gameSlice";

import '../style/mainPokemon.css'

interface ProvaTypingProps {
  pokemon: Pokemon;
}

const ProvaTyping: React.FC<ProvaTypingProps> = ({ pokemon }) => {
  const [word, setWord] = useState<string>("");

  const dispatch = useDispatch();
  const [animationKey, setAnimationKey] = useState<number>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
          dispatch(aggiornaPunteggio(100));
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
  }, [pokemon]);

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
          backgroundImage: `url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.id}.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: 'no-repeat',
        }}
      />
      <p style={{ fontSize: "2rem" }}>{word}</p>
    </div>
  );
};

export default ProvaTyping;