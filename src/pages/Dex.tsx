import { useEffect, useState } from 'react'
import List from '../components/List'
import axios from 'axios'

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

  
  useEffect(() => {
    axios.get(BaseUrl + '/pokemon?limit=9999')
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
  }, [selectValue, pokemons])

  useEffect(() => {
    axios.get(BaseUrl + '/type?limit=21')
      .then(res => setTypes(res.data.results))
      .catch(err => console.error(err))
  }, [])

  
  const pokemonsFiltered = (selectValue ? pokemonsByType : pokemons)
    ?.filter(p => p.name.toLowerCase().includes(searchValue.toLowerCase()))

  return (
    <div className="container mx-auto">
      {/* Filtros */}
      <form className="mb-4 flex gap-4 justify-center">
        <input
          type="text"
          className="bg-white border border-gray-300 py-1 px-4 rounded"
          placeholder="Buscar Pokemon..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <select
          value={selectValue}
          onChange={(e) => setSelectValue(e.target.value)}
          className="bg-white border border-gray-300 py-1 px-4 rounded"
        >
          <option value="">Selecciona un tipo</option>
          {types && types.map((t) => (
            <option key={t.name} value={t.name} className="capitalize">
              {t.name}
            </option>
          ))}
        </select>
      </form>

      {/* Lista de pokemones */}
      <List pokemons={pokemonsFiltered} />
    </div>
  )
}
