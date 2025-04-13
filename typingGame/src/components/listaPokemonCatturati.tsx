import React from "react";
import { useSelector } from "react-redux";
import '../style/text.css';
import {PokemonRegistrato} from "../models/pokemon";
import MiniSprite from "./miniSprite";

const ListaCatture: React.FC = () => {
    const listaCattura: PokemonRegistrato[] = useSelector((state: any) => state.game.listaPokemonCorretti);

    return (
        <div className="capture-container">
            {listaCattura.length > 0 ? (
                listaCattura.map((p, index) => (
                    <MiniSprite pokemon={p}/>
                ))
            ) : (<></>)}
        </div>
    );
};

export default ListaCatture;