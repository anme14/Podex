import React from 'react';

export const PokemonCardSkeleton: React.FC = () => {
  const cardClasses = "h-[150px] w-[310px] bg-white rounded shadow p-4 flex flex-col items-center justify-center border border-gray-200";

  return (
    <div className={`${cardClasses} animate-pulse`}>
      <div className="w-24 h-24 bg-gray-300 rounded"></div>
      <div className="h-6 w-2/3 mt-4 bg-gray-300 rounded"></div>
    </div>
  );
};

export default PokemonCardSkeleton;