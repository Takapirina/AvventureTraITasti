
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Pokemon, PokemonRegistrato} from '../models/pokemon';

interface GameState {
  listaPokemon: Pokemon[];
  indiceCorrente: number;
  punteggio: number;
  combo: number;
  listaPokemonCorretti: PokemonRegistrato[];
  listaSpecieCatturate: PokemonRegistrato[];
  tempoGlobale: number;
}

const initialState: GameState = {
  listaPokemon: [],
  indiceCorrente: 0,
  punteggio: 0,
  combo: 1,
  listaPokemonCorretti: [],
  listaSpecieCatturate: [],
  tempoGlobale: 60000, // si inizia con 2 minuti di tempo?
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setListaPokemon(state, action: PayloadAction<Pokemon[]>) {
      state.listaPokemon = action.payload;
    },
    avanzaIndice(state) {
      state.indiceCorrente += 1;
    },
    aggiornaPunteggio(state, action: PayloadAction<number>) {
      state.punteggio += action.payload;
    },
    resetGame(state) {
      state.listaPokemon = [];
      state.indiceCorrente = 0;
      state.punteggio = 0;
      state.combo = 1;
    },
    resetCombo(state) {
      state.combo = 1;
    },
    aggiornaCombo(state) {
      state.combo += 1;
    },
    aggiungiPokemonCorretto(state, action: PayloadAction<PokemonRegistrato>){
      state.listaPokemonCorretti.push(action.payload);
      const nuovoPokemon = action.payload;

      const index = state.listaSpecieCatturate.findIndex(
        (p) => p.name === nuovoPokemon.name
      );
    
      if (index === -1) {
        state.listaSpecieCatturate.push(nuovoPokemon);
      } else if (!state.listaSpecieCatturate[index].isCromatic && nuovoPokemon.isCromatic) {
        state.listaSpecieCatturate[index].isCromatic = true;
      }
    },
    resetTempo(state){
      state.tempoGlobale = 120;
    },
    UpdateTempoExtra(state, action: PayloadAction<number>){
      state.tempoGlobale += action.payload;
    }
  },
});

export const { setListaPokemon, avanzaIndice, aggiornaPunteggio, resetGame, resetCombo, aggiornaCombo,
               aggiungiPokemonCorretto, UpdateTempoExtra, resetTempo } = gameSlice.actions;
export default gameSlice.reducer;