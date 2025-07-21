import { useState } from "react";
import { useGetPokemonsInfoQuery } from "../store/pokemonApi";
import PokemonGrid from "./PokemonGrid";

const PAGE_SIZE = 16;

export default function PaginationPokemons() {
  const [page, setPage] = useState(0);
  const { data, error, isLoading, isFetching } = useGetPokemonsInfoQuery({
    offset: page * PAGE_SIZE,
    limit: PAGE_SIZE,
  });

  const total = data?.count ?? 0;
  const maxPage = Math.ceil(total / PAGE_SIZE) - 1;

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading pokemons.</div>}
      <PokemonGrid pokemons={data?.results ?? []} />
      <div className="flex justify-center items-center my-1 p-2">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0 || isFetching}
          className="px-4 py-2 mx-2 text-white bg-black rounded hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="mx-4 text-lg font-semibold">
          Page {page + 1} of {maxPage + 1}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
          disabled={page === maxPage || isFetching}
          className="px-4 py-2 mx-2 text-white bg-black rounded hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </>
  );
}
