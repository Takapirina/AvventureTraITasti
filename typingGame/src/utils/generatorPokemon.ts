import {Pokemon} from "../models/pokemon";

export async function getRandomPokemonList(numPokemon: number = 20): Promise<Pokemon[]> {
  const res = await fetch("/pokemonList.json");
  const pokemonListJson: Pokemon[] = await res.json();

  const selected: Pokemon[] = [];
  const usedIds: Set<number> = new Set();

  const maxIndex = pokemonListJson.length;

  while (selected.length < numPokemon) {
    const randomIndex = Math.floor(Math.random() * maxIndex);
    const pokemon = pokemonListJson[randomIndex];

    if (!usedIds.has(pokemon.id)) {
      selected.push(pokemon);
      usedIds.add(pokemon.id);
    }
  }

  console.log(selected);
  return selected;
}