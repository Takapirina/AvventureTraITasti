import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateTempoExtra } from "../store/gameSlice";
import "../style/timer.css";

export const Timer: React.FC = () => {
  const tempoGlobale = useSelector((state: any) => state.game.tempoGlobale);
  const dispatch = useDispatch();

  const [tempoMax, setTempoMax] = useState<number>(tempoGlobale);
  const taccheTotali = tempoMax;
  const taccheAccese = tempoGlobale;

  useEffect(() => {
    if (tempoGlobale <= 0) return;

    const interval = setInterval(() => {
      dispatch(UpdateTempoExtra(-1));
    }, 1000);

    return () => clearInterval(interval);
  }, [tempoGlobale, dispatch]);

  return (
    <div className="timerComponent">
      <div className="timerText">{Math.round(tempoGlobale)} s</div>
      <div className="barraContainer">
        {[...Array(taccheTotali)].map((_, i) => (
          <div
            key={i}
            className={`taccaUnitaria ${
              i < taccheAccese ? "taccaOn" : "taccaOff"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Timer;