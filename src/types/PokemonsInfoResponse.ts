import type { PokemonInfo } from "./PokemonInfo";

export type PokemonInfoResponse = {
  count: number;
  next: string;
  previous: string;
  results: Array<PokemonInfo>;
};
