// @ts-ignore
import stringSimilarity from 'string-similarity';

import { AppDispatch } from '../store';
import { aggiornaPunteggio, aggiornaCombo, resetCombo } from "../store/gameSlice";

const getSimilarity = (finalName : string , inputName : string) : number => {
    return stringSimilarity.compareTwoStrings(finalName, inputName);
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
    finalName : string,
    inputName: string,
    time: number,
    isShiny: boolean,
    combo: number
    ) : void => {

    let timeBonus = getTime(finalName, time);
    let similarityBonus = getSimilarity(finalName, inputName);

    if (timeBonus >= 1.2 && similarityBonus == 1) {
        dispatch(aggiornaCombo())
        console.log("combo +1 " + combo);
    } else if (timeBonus < 1.2 || similarityBonus != 1){
        dispatch(resetCombo());
        console.log("combo reset " + combo);
    }
    

    let base = isShiny ? finalName.length * 500 : finalName.length * 100;
    let punteggio = Math.round(base * similarityBonus * timeBonus * combo);
    dispatch(aggiornaPunteggio(punteggio));
}
