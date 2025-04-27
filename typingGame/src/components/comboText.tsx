import React from "react"
import '../style/text.css'
import { useSelector } from "react-redux";


const ComboText: React.FC = () => {
    let combo: number = useSelector((state: any) => state.game.combo)

  return (
    <div className="pokemonName-container">
      <div className="textCyber">{combo}</div>
    </div>
  );
};

export default ComboText;