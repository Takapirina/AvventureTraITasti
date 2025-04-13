import React, { useEffect, useState } from "react";
import {Pokemon} from "../models/pokemon";
import { useSelector } from "react-redux";

interface ListNextPokemonsProps {
    listPokemons: Pokemon[],
}

const ListNextPokemons: React.FC<ListNextPokemonsProps> = ({ listPokemons }) => {
    const [newList, setNewList] = useState<Pokemon[]>([]);

    const indiceCorrente = useSelector((state: any) => state.game.indiceCorrente);

    useEffect(() => {
        if (listPokemons.length > 0) {
            const nextPokemons = listPokemons.slice(indiceCorrente+1, indiceCorrente + 7);
            setNewList(nextPokemons);
        }
    }, [listPokemons, indiceCorrente]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column-reverse',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            gap: '10px',
            backgroundColor: '#ffffff10',
            borderRadius: '15px',
            height: '100%'
        }}>
            {
                newList.map((pokemon, index) => (
                    <div key={index} style={{
                        width: '90px',
                        height: '90px',
                        backgroundImage: `url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: "grayscale(100%) brightness(0)" 
                    }} />
                ))
            }
        </div>
    );
}

export default ListNextPokemons;