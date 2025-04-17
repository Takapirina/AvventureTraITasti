import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateTempoExtra } from "../store/gameSlice";

import '../style/timer.css'


export const Timer : React.FC = () => {
    const tempoGlobale = useSelector((state: any) => state.game.tempoGlobale);
    const dispatch = useDispatch();

    useEffect(() => {
      if (tempoGlobale <= 0) return;
  
      const interval = setInterval(() => {
        dispatch(UpdateTempoExtra(-1));
      }, 1000);
  
      return () => clearInterval(interval);
    }, [tempoGlobale, dispatch]);

    return (
        <div className="timerContainer">
            <div className="timerBoard"></div>
            <div className="timerLevel"></div>
            timer : {tempoGlobale}
        </div>
    )
}

export default Timer