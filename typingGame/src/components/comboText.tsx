import React from "react"
import { useSelector } from "react-redux";
import '../style/text.css'

const ComboText : React.FC = () => {
    return (
        <div className="pokemonName-container">
        <div className="textGame" style={{display: 'flex'}}>
            <p style={{fontSize: '40px'}}>combo</p>
            {useSelector((state: any) => state.game.combo)}
        </div>
        <div className="textGame2" style={{display: 'flex'}}>
            <p style={{fontSize: '40px'}}>combo</p>
            {useSelector((state: any) => state.game.combo)}
        </div>
        </div>
    )
}

export default ComboText