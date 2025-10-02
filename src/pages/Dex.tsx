import { useEffect, useState } from 'react'
import List from '../components/List'
import axios from 'axios'
import PokemonCard from '../components/PokemonCard'

type Pokemon = {
  name: string
  url: string
}

type Type = {
  name: string
  url: string
}

const BaseUrl = 'https://pokeapi.co/api/v2'

export default function Dex () {
  const [pokemons, setPokemons] = useState<Pokemon[] | null>(null)
  const [pokemonsByType, setPokemonsByType] = useState<Pokemon[] | null>(null)
  const [types, setTypes] = useState<Type[] | null>(null)

  const [searchValue, setSearchValue] = useState('')
  const [selectValue, setSelectValue] = useState('')
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null)

  useEffect(() => {
    axios.get(BaseUrl + '/pokemon?limit=151')
      .then(res => setPokemons(res.data.results)) 
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    if (selectValue !== '') {
      axios.get(BaseUrl + `/type/${selectValue}`)
        .then(res => {
          const pokemonNames = res.data.pokemon.map((p: { pokemon: Pokemon }) => p.pokemon.name)
          const filteredPokemons = pokemons?.filter(p => pokemonNames.includes(p.name)) || null
          setPokemonsByType(filteredPokemons)
        })
    }
  }, [selectValue])

  useEffect(() => {
    axios.get(BaseUrl + '/type?limit=21')
      .then(res => setTypes(res.data.results))
      .catch(err => console.error(err))
  }, [])

  const pokemonsFiltered = (selectValue ? pokemonsByType : pokemons)
    ?.filter(p => p.name.toLowerCase().includes(searchValue.toLowerCase()))


  const fetchPokemonDetails = async (name: string) => {
    const res = await axios.get(BaseUrl + `/pokemon/${name}`)
    const data = res.data
    const formatted = {
      id: data.id,
      name: data.name,
      image: data.sprites.other['official-artwork'].front_default,
      types: data.types.map((t: any) => t.type.name),
      moves: data.moves.map((m: any) => m.move.name),
      stats: {
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        specialAttack: data.stats[3].base_stat,
        specialDefense: data.stats[4].base_stat,
        speed: data.stats[5].base_stat
      }
    }
    setSelectedPokemon(formatted)
  }

  return (
    <div className='container mx-auto'>
      <form className='mb-4 flex gap-4 justify-center'>
        <input
          type="text"
          className='bg-white border border-gray-300 py-1 px-4 rounded'
          placeholder='Buscar Pokemon...'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <select
          value={selectValue}
          onChange={(e) => setSelectValue(e.target.value)}
          className='bg-white border border-gray-300 py-1 px-4 rounded'
        >
          <option value=''>Selecciona un tipo</option>
          {types && types.map(t => (
            <option key={t.name} value={t.name} className='capitalize'>
              {t.name}
            </option>
          ))}
        </select>
      </form>

      {/* Lista de pokemones */}
      {pokemons && (
        <List
          pokemons={pokemonsFiltered}
          onSelectPokemon={fetchPokemonDetails} 
        />
      )}

      {/* Card del Pokémon seleccionado */}
      {selectedPokemon && (
        <div className="mt-20 flex justify-center">
          <PokemonCard {...selectedPokemon} />
        </div>
      )}
    </div>
  )
}
