import Item from './Item'
import { Link } from 'react-router-dom'


type pokemon = {
  name: string
  url: string
}

export default function List ({ pokemons }: { pokemons: pokemon[] | undefined }) {
  return (
    <div>
      <div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 border-4 p-9 rounded'>
        {pokemons && pokemons?.map(pokemon => (
          <Link key={pokemon.name} to={`/dex/${pokemon.name}`}>
            <Item url={pokemon.url} />
          </Link>
        ))}
      </div>

      {pokemons?.length === 0 && <p>No hay pokemons</p>}
    </div>
  )
}