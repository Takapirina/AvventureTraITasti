import React from "react"
import '../style/text.css'


interface testo {
    nome: string;
}

const Text : React.FC<testo> = ({nome}) => {
    return (
        <div className="pokemonName-container">
        <div className="textGame">
            {nome.toUpperCase()}
        </div>
        <div className="textGame2">
            {nome.toUpperCase()}
        </div>
        </div>
    )
}

export default Text