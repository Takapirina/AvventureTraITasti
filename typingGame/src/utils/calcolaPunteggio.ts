// @ts-ignore
import stringSimilarity from 'string-similarity';

import { AppDispatch } from '../store';
import { aggiornaPunteggio, aggiornaCombo, resetCombo, aggiungiPokemonCorretto} from "../store/gameSlice";
import {Pokemon, PokemonRegistrato} from '../models/pokemon';

const getSimilarity = (finalName : string , inputName : string) : number => {
    return stringSimilarity.compareTwoStrings(finalName, inputName); // ritorna un valore tra 0 - 1
}

const getTime = (finalName: string, tempo:number) : number => {
    let perfect : number = finalName.length * 0.3;
    let excellent : number = finalName.length * 0.5;
    let good : number = finalName.length * 0.8;
    if(tempo <= perfect){
        console.log("perfetto");
        return 1.5;
    } else if(tempo <= excellent){
        console.log("eccellente");
        return 1.2;
    } else if (tempo <= good){
        console.log("buono")
        return 1;
    } else {
        console.log("meh");
        return 0.8;
    };
}

export const calcolaPunteggio = (
    dispatch: AppDispatch,
    pokemon: Pokemon,
    inputName: string,
    time: number,
    isShiny: boolean,
    combo: number
    ) : void => {

    let timeBonus = getTime(pokemon.name, time);
    let similarityBonus = getSimilarity(pokemon.name, inputName);

    if (timeBonus >= 1.2 && similarityBonus == 1) {
        dispatch(aggiornaCombo())
        let pokemonRegistrato: PokemonRegistrato = {
            id: pokemon.id,
            name: pokemon.name,
            isCromatic: isShiny
          };
        similarityBonus == 1 ? dispatch(aggiungiPokemonCorretto(pokemonRegistrato)) : null;
    } else if (timeBonus < 1.2 || similarityBonus != 1){
        dispatch(resetCombo());
    }
    

    let base = isShiny ? pokemon.name.length * 500 : pokemon.name.length * 100;
    let punteggio = Math.round(base * similarityBonus * timeBonus * combo);
    dispatch(aggiornaPunteggio(punteggio));
}
