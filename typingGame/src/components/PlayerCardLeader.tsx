import React from "react";
import { Partita } from "../models/pokemon";
import "../style/playerCard.css";

interface PlayerCardLeaderProp {
  data: Partita;
  isCurrentPlayer: boolean;
}

const PlayerCardLeader: React.FC<PlayerCardLeaderProp> = ({ data, isCurrentPlayer }) => {
  return (
    <div className={`card-container ${isCurrentPlayer ? "you-card" : ""}`}>
      <div className="player-card">
        <div className="name-img-container">
          <div
            className="img-Player"
            style={{ backgroundImage: `url(${data.urlImg})` }}
          />
          <div className="textCyber player-name">
            {isCurrentPlayer ? "YOU" : data.nome}
          </div>
        </div>
        <div className="textCyber player-points">{data.punteggio} pt</div>
      </div>
    </div>
  );
};

export default PlayerCardLeader;