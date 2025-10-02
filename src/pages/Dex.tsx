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

export default function Dex() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [pokemonsByType, setPokemonsByType] = useState<Pokemon[] | null>(null)
  const [types, setTypes] = useState<Type[] | null>(null)

  const [searchValue, setSearchValue] = useState('')
  const [selectValue, setSelectValue] = useState('')

  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)
  const limit = 20 // cuantos pokes carga cada vez

 
  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`${BaseUrl}/pokemon?limit=${limit}&offset=${offset}`)
        setPokemons(prev => [...prev, ...res.data.results]) // acumula
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchPokemons()
  }, [offset])

  
  useEffect(() => {
    const handleScroll = () => {
      const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200
      if (bottom && !loading) {
        setOffset(prev => prev + limit)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loading])

  
  useEffect(() => {
    if (selectValue !== '') {
      axios.get(BaseUrl + `/type/${selectValue}`)
        .then(res => {
          const pokemonNames = res.data.pokemon.map((p: { pokemon: Pokemon }) => p.pokemon.name)
          const filteredPokemons = pokemons?.filter(p => pokemonNames.includes(p.name)) || []
          setPokemonsByType(filteredPokemons)
        })
    } else {
      setPokemonsByType(null) 
    }
  }, [selectValue, pokemons])

 
  useEffect(() => {
    axios.get(BaseUrl + '/type?limit=25')
      .then(res => setTypes(res.data.results))
      .catch(err => console.error(err))
  }, [])

 
  const pokemonsFiltered = (selectValue ? pokemonsByType : pokemons)
    ?.filter(p => p.name.toLowerCase().includes(searchValue.toLowerCase()))

  return (
    <div className="container mx-auto">
     
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

    
      <List pokemons={pokemonsFiltered} />

      
      {loading && <p className="text-center my-4">Cargando...</p>}
    </div>
  )
}
