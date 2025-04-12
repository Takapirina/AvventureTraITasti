// @ts-ignore
import stringSimilarity from 'string-similarity';

// funzione che permette di caloclare la similarità tra cio che hai scritto e cio che doveva essere
// utilizzo della libreria della libreria di string-similarity
export const getSimilarity = (stringa1 : string , stringa2 : string) : number => {
    return stringSimilarity.compareTwoStrings(stringa1, stringa2);
}

// funzione che genera un moltiplicatore dato la velocità di typing
export const getTime = () : number => {
    return 0;
}