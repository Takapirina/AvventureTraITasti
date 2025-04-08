import axios from 'axios';
import Pokemon from '../models/pokemon';

export async function getRandomPokemonList(numPokemon: number = 20): Promise<Pokemon[]> {
  const pokemonList: Pokemon[] = [];
  const maxPokemonId = 1026;

  for (let i = 0; i < numPokemon; i++) {
    const randomId = Math.floor(Math.random() * maxPokemonId);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}/`);
      const data = response.data;
      
      pokemonList.push({
        id: data.id,
        name: data.name
      });
    } catch (error) {
      console.error(`Errore nel recuperare i dati per il Pokémon con ID ${randomId}:`, error);
    }
  }

  return pokemonList;
}