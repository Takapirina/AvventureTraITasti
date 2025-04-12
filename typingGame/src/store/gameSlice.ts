
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Pokemon from '../models/pokemon';

interface GameState {
  listaPokemon: Pokemon[];
  indiceCorrente: number;
  punteggio: number;
  combo: number;
}

const initialState: GameState = {
  listaPokemon: [],
  indiceCorrente: 0,
  punteggio: 0,
  combo: 1,
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
    }
  },
});

export const { setListaPokemon, avanzaIndice, aggiornaPunteggio, resetGame, resetCombo, aggiornaCombo } = gameSlice.actions;
export default gameSlice.reducer;