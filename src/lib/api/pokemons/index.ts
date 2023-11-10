import { BaseAPI } from "../apiBase";
import { exceptionMiddleware } from "./exceptionMiddleware";

// const POKEMON_API_BASE_PATH = "https://pokeapi.co/api/v2/";
const POKEMON_API_BASE_PATH = "https://pokeapfffffffffffi.co/api/v2/";

export class PokemonsAPI extends BaseAPI {
  constructor() {
    super();

    this.baseURL = POKEMON_API_BASE_PATH;
    this.exceptionMiddleware = exceptionMiddleware;
  }

  async fetchPokemon(name: string) {
    return this.get(`/pokemon/${name}`);
  }
}
