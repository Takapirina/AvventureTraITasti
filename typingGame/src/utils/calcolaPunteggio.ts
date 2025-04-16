// @ts-ignore
import stringSimilarity from 'string-similarity';

import { AppDispatch } from '../store';
import { aggiornaPunteggio, aggiornaCombo, resetCombo, aggiungiPokemonCorretto} from "../store/gameSlice";
import {Pokemon, PokemonRegistrato} from '../models/pokemon';

import { feedbackNoob, feedbackOk, feedbackBenFatto, feedbackFantastico, feedbackLegendario, feedbackStraordinario } from '../models/feedbackList';

const getSimilarity = (finalName : string , inputName : string) : number => {
    return stringSimilarity.compareTwoStrings(finalName, inputName);
}

const getTime = (finalName: string, tempo:number) : number => {
    let perfect : number = finalName.length * 0.3;
    let excellent : number = finalName.length * 0.5;
    let good : number = finalName.length * 0.8;
    if(tempo <= perfect){
        return 1.5;
    } else if(tempo <= excellent){
        return 1.2;
    } else if (tempo <= good){
        return 1;
    } else {
        return 0.8;
    };
}

const getCombo = (combo : number) : number => {
    // moltiplicatore = 1 + 0.5 * log10(combo + 1)
    let moltiplicatore = 1 + 0.5 * Math.log(combo +1);
    console.log(moltiplicatore)
    return moltiplicatore;
}

const getFeedback = (timeBonus: number, similarity: number, combo: number, cromatico: boolean): string => {
    let points = 0;
  
    if (timeBonus >= 1.5) points += 3;
    else if (timeBonus >= 1.2) points += 2;
    else if (timeBonus >= 1.0) points += 1;
  
    if (similarity === 1) points += 3;
    else if (similarity >= 0.95) points += 2;
    else if (similarity >= 0.85) points += 1;
  
    if (combo >= 50) points += 3;
    else if (combo >= 30) points += 2;
    else if (combo >= 10) points += 1;
  
    if (cromatico) points += 2;
  
    console.log(`Feedback points: ${points}`);
  
    if (points >= 8) return pickRandom(feedbackLegendario);
    if (points >= 7) return pickRandom(feedbackStraordinario);
    if (points >= 6) return pickRandom(feedbackFantastico);
    if (points >= 5) return pickRandom(feedbackBenFatto);
    if (points >= 4) return pickRandom(feedbackOk);
    return pickRandom(feedbackNoob);
  };

  function pickRandom(arr: string[]): string {
    return arr[Math.floor(Math.random() * arr.length)];
  }

export const calcolaPunteggio = (
    dispatch: AppDispatch,
    pokemon: Pokemon,
    inputName: string,
    time: number,
    isShiny: boolean,
    combo: number
    ) : string => {

    let timeBonus = getTime(pokemon.name, time);
    let similarityBonus = getSimilarity(pokemon.name, inputName);
    
    if(similarityBonus == 1){
        let pokemonRegistrato: PokemonRegistrato = {
            id: pokemon.id,
            name: pokemon.name,
            isCromatic: isShiny
          };
          dispatch(aggiungiPokemonCorretto(pokemonRegistrato))
    }

    if (timeBonus >= 1.2 && similarityBonus == 1) {
        dispatch(aggiornaCombo())
    } else if (timeBonus < 1.2 || similarityBonus != 1){
        dispatch(resetCombo());
    }
    

    let base = isShiny ? pokemon.name.length * 500 : pokemon.name.length * 100;
    let punteggio = Math.round(base * similarityBonus * timeBonus * getCombo(combo));
    dispatch(aggiornaPunteggio(punteggio));
    return getFeedback(timeBonus, similarityBonus, combo, isShiny);
}