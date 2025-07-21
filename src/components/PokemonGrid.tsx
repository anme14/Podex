import React from "react";
import PokemonCard from "./PokemonCard";
import type { PokemonInfo } from "../types/PokemonInfo";

interface PokemonGridProps {
  pokemons: PokemonInfo[];
}

const PokemonGrid: React.FC<PokemonGridProps> = ({ pokemons }) => (
  <div className="w-full max-w-[1400px] mx-auto py-8 px-12 flex justify-center flex-wrap gap-4">
    {pokemons.map((pokemon) => (
      <PokemonCard key={pokemon.url} url={pokemon.url} name={pokemon.name} />
    ))}
  </div>
);

export default PokemonGrid;
