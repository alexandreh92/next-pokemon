export const revalidate = 0;

import { PokemonsAPI } from "~/lib/api/pokemons";

const pokemonsAPI = new PokemonsAPI();

export default async function Home() {
  const { data, errors } = await pokemonsAPI.fetchPokemon<{
    id: number;
    foo: string;
  }>("ditto");

  return (
    <main>
      <div>{JSON.stringify(data)}</div>
      <div>{JSON.stringify(errors)}</div>
    </main>
  );
}
