import React from "react"
import { useSelector } from "react-redux";
import '../style/text.css'

const Punteggio : React.FC = () => {
    return (
        <div className="pokemonName-container">
            <div className="textCyber">{useSelector((state: any) => state.game.punteggio)}</div>
        </div>
    )
}

export default Punteggio