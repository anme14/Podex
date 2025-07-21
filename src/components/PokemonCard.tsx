import React from 'react';
import { useGetPokemonByUrlQuery } from '../store/pokemonApi';
import type { PokemonInfo } from '../types/PokemonInfo';
import { useNavigate } from 'react-router-dom';
import PokemonCardSkeleton from './PokemonCardSkeleton';


const PokemonCard: React.FC<PokemonInfo> = ({ url, name }) => {
  const { data, error, isLoading } = useGetPokemonByUrlQuery(url);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokemon/${data?.id}`, { state: { pokemonUrl: url } });
  };

  const cardClasses = "h-[150px] w-[310px] bg-white rounded shadow p-4 flex flex-col items-center justify-center text-lg font-semibold capitalize border border-gray-200 hover:shadow-lg transition";

  if (isLoading) return <PokemonCardSkeleton />;

  if (error) {
    return <div className={cardClasses}>Error loading {name}</div>;
  }

  return (
    <div className={cardClasses} onClick={handleClick}>
      {data?.sprites.front_default && <img src={data.sprites.front_default} alt={name} className="w-24 h-24" />}
      {name}
    </div>
  );
};

export default PokemonCard;