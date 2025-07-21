import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PokemonInfoResponse } from "../types/PokemonsInfoResponse";
import type { Pokemon } from "../types/Pokemon";

const BASE_URL = "https://pokeapi.co/api/v2/";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getPokemonsInfo: builder.query<
      PokemonInfoResponse,
      { offset: number; limit: number }
    >({
      query: ({ offset, limit }) => `pokemon?offset=${offset}&limit=${limit}`,
    }),
    getPokemonByUrl: builder.query<Pokemon, string>({
      query: (url) => `${url.replace(BASE_URL, "")}`,
    }),
  }),
});

export const { useGetPokemonsInfoQuery, useGetPokemonByUrlQuery } = pokemonApi;
