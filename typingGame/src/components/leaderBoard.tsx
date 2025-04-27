import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import PlayerCardLeader from "./PlayerCardLeader";
import { Partita } from "../models/pokemon";
import { RootState } from "../store";

export async function getPlayerList(): Promise<Partita[]> {
  const res = await fetch("/leaderBoard.json");
  const pokemonListJson: Partita[] = await res.json();
  return pokemonListJson;
}

const LeaderBoard: React.FC = () => {
  const [playerList, setPlayerList] = useState<Partita[]>([]);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [cardHeight, setCardHeight] = useState<number>(0);

  const cardRef = useRef<HTMLDivElement>(null);

  const currentPlayerScore = useSelector((state: RootState) => state.game.punteggio);

  const currentPlayer: Partita = {
    nome: "YOU",
    urlImg: "path/to/your-image.jpg",
    punteggio: currentPlayerScore,
    pokemonCatturati: 10,
  };

  useEffect(() => {
    const fetchPlayerList = async () => {
      try {
        const players = await getPlayerList();
        setPlayerList(players);
      } catch (error) {
        console.error("Errore nel recupero della lista giocatori:", error);
      }
    };
    fetchPlayerList();
  }, []);

  useEffect(() => {
    if (cardRef.current) {
      setCardHeight(cardRef.current.offsetHeight);
    }
  }, [playerList]);

  useEffect(() => {
    if (playerList.length > 0 && cardHeight > 0) {
      const allPlayers = [...playerList, currentPlayer];
      const sortedPlayers = allPlayers.sort((a, b) => b.punteggio - a.punteggio);
      const youPos = sortedPlayers.findIndex(player => player.nome === "YOU");

      if (youPos !== -1) {

        const containerHeight = 600; 
        const centerPosition = (containerHeight / 2) - (cardHeight / 2);
        const scroll = Math.max(0, (youPos * cardHeight) - centerPosition);

        setScrollPosition(scroll);
      }
    }
  }, [currentPlayerScore, playerList, cardHeight]);

  const allPlayers = [...playerList, currentPlayer];
  const sortedPlayers = allPlayers.sort((a, b) => b.punteggio - a.punteggio);

  return (
    <div className="leaderboard-container">
      {/* Lista dei giocatori scrollabile */}
      <div
        className="leaderboard-scrollable"
        style={{
          transform: `translateY(-${scrollPosition}px)`,
        }}
      >
        {sortedPlayers.map((player, index) => (
          <div
            key={player.nome}
            ref={player.nome === "YOU" ? cardRef : null}
            className={`player-card-container ${player.nome === "YOU" ? "invisible" : ""}`}
          >
            <PlayerCardLeader data={player} isCurrentPlayer={player.nome === "YOU"} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;