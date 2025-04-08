
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Pokemon from '../models/pokemon';

interface GameState {
  listaPokemon: Pokemon[];
  indiceCorrente: number;
  punteggio: number;
}

const initialState: GameState = {
  listaPokemon: [],
  indiceCorrente: 0,
  punteggio: 0,
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
    },
  },
});

export const { setListaPokemon, avanzaIndice, aggiornaPunteggio, resetGame } = gameSlice.actions;
export default gameSlice.reducer;