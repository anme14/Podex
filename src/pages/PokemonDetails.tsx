import { useNavigate, useParams } from 'react-router-dom';
import { useGetPokemonByUrlQuery } from '../store/pokemonApi';

export default function PokemonDetails () {
   const params = useParams();
   const url:string = `pokemon/${params.id}`;
   const { data, error, isLoading } = useGetPokemonByUrlQuery(url);
   const navigate = useNavigate();

  {isLoading && <div>Loading...</div>}
  {error && <div>Error loading </div>}
  return (
    <div className='max-screen-lg mx-auto bg-gradient-to-r from-white to-pink-100 p-12'>
      <button onClick={() => navigate('/')} className='my-4 bg-white shadow-sm hover:bg-gray-300 text-gray-800 font-bold p-4 rounded'>
       Back to list
      </button> 
    <div className='mx-auto max-w-screen-lg p-4'>

      <div className='text-white text-center mb-4 p-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg'> 
         <h1 className='font-bold text-3xl mb-2'> {data?.name} </h1>
          #{data?.id}
      </div>
      <div className='flex justify-center items-center flex-wrap'>
        <div className='min-w-1/2 p-12'>
          <img src={data?.sprites.front_default} alt={data?.name} className='rounded-lg w-100' />
          <div className='w-full flex justify-between  mt-4 text-center gap-4 flex-wrap'>
            <div className='w-48 py-8 bg-gray-100 rounded'>
              Height 
             <p className='text-xl font-bold mt-2'> {data?.height} </p>
            </div>
               <div className='w-48 py-8 bg-gray-100 rounded'>
               Weight
             <p className='text-xl font-bold mt-2'> {data?.weight} </p>
            </div>
          </div>
        </div>
        <div className='min-w-1/2 p-12'>
          <h1 className='font-bold text-xl mb-4'> Base Stats </h1>
          {data?.stats.map((stat) => (
            <div key={stat.stat.name} className=' w-full my-6'>
              <div className='flex flex-wrap w-full justify-between mb-2'> 
                <p className='font-bold'>{stat.stat.name}</p>
                <p>{stat.base_stat}</p>
              </div>
               <div className='bg-gray-300 h-2 rounded-full w-full'>
              <div className={`bg-gray-900 h-2 rounded-l`} style={{width: `${stat.base_stat}%`}} />  
              </div>
            </div>
          ))}
             <h1 className='font-bold text-xl my-4'> Abilities </h1>
             {data?.abilities.map((ability) => (
              <div key={ability.ability.name} className='w-fit rounded-xl border-1 border-gray-300 p-2 my-2'>
                <p className='font-bold text-sm'>{ability.ability.name}
                  <span> {ability.is_hidden ? ' (Hidden)' : ''} </span>
                </p>
              </div>
            ))}

            <h1 className='font-bold text-xl my-4'> Base Experience </h1>
            <p className='text-2xl font-bold mt-2 text-purple-600' > {data?.base_experience} XP </p>


        </div>
      </div>
    </div>
    </div>
  );
};
