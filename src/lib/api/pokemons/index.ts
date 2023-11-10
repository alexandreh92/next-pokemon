import { BaseAPI } from "../apiBase";
import { exceptionMiddleware } from "./exceptionMiddleware";

const POKEMON_API_BASE_PATH = "https://pokeapi.co/api/v2/";

export class PokemonsAPI extends BaseAPI {
  constructor() {
    super();

    this.baseURL = POKEMON_API_BASE_PATH;
    this.responseMiddlewares = [exceptionMiddleware];
  }

  async fetchPokemon<T>(name: string) {
    return this.get<T>(`pokemon/${name}`, {
      next: { revalidate: 0 },
    });
  }
}
