import { useState, useEffect, useRef } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import { useGetPokemonsInfoQuery } from "../store/pokemonApi";
import PokemonCard from "./PokemonCard";
import type { PokemonInfo } from "../types/PokemonInfo";
import Loader from "./Loader";

const PAGE_SIZE = 16;
const CARD_HEIGHT = 150;
const CARD_WIDTH = 310;
const GAP = 16;

export default function LoadMorePokemons() {
  const [offset, setOffset] = useState(0);
  const [pokemons, setPokemons] = useState<PokemonInfo[]>([]);
  const { data, error, isLoading, isFetching } = useGetPokemonsInfoQuery({
    offset,
    limit: PAGE_SIZE,
  });

  const total = data?.count ?? 0;

  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver(() => {
      setDimensions({
        width: element.offsetWidth,
        height: element.offsetHeight,
      });
    });

    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (data?.results) {
      if (offset === 0) {
        setPokemons(data.results);
      } else {
        setPokemons((prev) => [...prev, ...data.results]);
      }
    }
  }, [data, offset]);

  const handleLoadMoreClick = () => {
    if (pokemons.length < total) {
      setOffset((prev) => prev + PAGE_SIZE);
    }
  };

  const columnCount = Math.min(
    4,
    Math.max(1, Math.floor(dimensions.width / (CARD_WIDTH + GAP)))
  );
  const gridWidth = columnCount * (CARD_WIDTH + GAP);
  const rowCount = Math.ceil(pokemons.length / columnCount);

  const Cell = ({ columnIndex, rowIndex, style }: any) => {
    const index = rowIndex * columnCount + columnIndex;
    const pokemon = pokemons[index];
    return (
      <div style={{ ...style, padding: `${GAP / 2}px` }}>
        {pokemon ? <PokemonCard url={pokemon.url} name={pokemon.name} /> : null}
      </div>
    );
  };

  return (
    <>
     {isLoading && pokemons.length === 0 && (
          <Loader/>
      )}
        {error && (
          <div className="text-center p-4">Error loading pokemons.</div>
        )}
    <div className="flex flex-col h-[calc(100vh-150px)] py-4 px-6 mx-auto">
      <div ref={containerRef} className="flex-grow overflow-x-hidden">       
        {dimensions.width > 0 && (
          <div className="flex justify-center">
            <Grid
              columnCount={columnCount}
              columnWidth={CARD_WIDTH + GAP}
              height={dimensions.height}
              rowCount={rowCount}
              rowHeight={CARD_HEIGHT + GAP}
              width={gridWidth}
              style={{ overflowX: "hidden" }}
            >
              {Cell}
            </Grid>
          </div>
        )}
      </div>

      {pokemons.length < total && (
        <div className="flex justify-center my-4">
          <button
            onClick={handleLoadMoreClick}
            className="px-4 py-2 mx-2 text-white bg-black rounded hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={isLoading || isFetching}
          >
            {isFetching ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
      {pokemons.length >= total && (
        <div className="text-center py-4 text-gray-500">
          No more pokemons to load.
        </div>
      )}
    </div>
    </>
  );
}
