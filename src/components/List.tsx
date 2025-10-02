import Item from './Item'
import { Link } from 'react-router-dom'

type Pokemon = {
  name: string
  url: string
}

export default function List({ pokemons }: { pokemons: Pokemon[] | undefined }) {
  return (
    <div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-6">
        {pokemons && pokemons.map((pokemon) => (
          <Link 
            key={pokemon.name} 
            to={`/dex/${pokemon.name}`} 
            className="block hover:scale-105 transition-transform"
          >
            <Item url={pokemon.url} />
            <p className="text-center mt-2 capitalize font-semibold">{pokemon.name}</p>
          </Link>
        ))}
      </div>

      {pokemons?.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No hay pokémon</p>
      )}
    </div>
  )
}
