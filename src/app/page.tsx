import { PokemonsAPI } from "~/lib/api/pokemons";

const pokemonsAPI = new PokemonsAPI();

export default async function Home() {
  const ditto = await pokemonsAPI.fetchPokemon("ditto");

  return (
    <main>
      <div>{JSON.stringify(ditto)}</div>
    </main>
  );
}
