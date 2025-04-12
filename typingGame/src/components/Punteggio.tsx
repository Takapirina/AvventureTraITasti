import React from "react"
import { useSelector } from "react-redux";
import '../style/text.css'

const Punteggio : React.FC = () => {
    return (
        <div className="pokemonName-container">
        <div className="textGame" style={{display: 'flex'}}>
            {useSelector((state: any) => state.game.punteggio)}
            <p style={{fontSize: '40px'}}>pt</p>
        </div>
        <div className="textGame2" style={{display: 'flex'}}>
            {useSelector((state: any) => state.game.punteggio)}
            <p style={{fontSize: '40px'}}>pt</p>
        </div>
        </div>
    )
}

export default Punteggio