import fetch from 'node-fetch';
import fs from 'fs';
import pLimit from 'p-limit';

const limit = pLimit(20);
const maxPokemon = 1025;
const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

async function fetchPokemon(id) {
  try {
    const response = await fetch(`${apiUrl}${id}`);
    if (!response.ok) throw new Error(`Errore con ID ${id}`);
    const data = await response.json();
    return { name: data.name, id: data.id };
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

async function main() {
  const promises = [];

  for (let i = 1; i <= maxPokemon; i++) {
    promises.push(limit(() => fetchPokemon(i)));
  }

  const results = await Promise.all(promises);
  const filteredResults = results.filter(Boolean);

  fs.writeFileSync('pokemonList.json', JSON.stringify(filteredResults, null, 2));
  console.log(`Salvati ${filteredResults.length} Pokémon in pokemonList.json`);
}

main();