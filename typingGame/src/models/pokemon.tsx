export interface PokemonRegistrato {
    name: string,
    id: number,
    isCromatic: boolean
}

export interface Pokemon {
    name: string,
    id: number
}

export interface Partita {
    nome: string;
    urlImg: string;
    punteggio: number;
    pokemonCatturati: number;
  }