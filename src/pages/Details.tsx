import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom' 
import axios from 'axios'
import PokemonCard from '../components/PokemonCard' 

const BaseUrl = 'https://pokeapi.co/api/v2/pokemon'

type Pokemon = {
  id: number
  name: string
  image: string
  types: string[]
  moves: string[]
  stats: Stats
}

type Type = {
  slot: number,
  type: {
    name: string,
    url: string
  }
}

type Moves = {
  move: Move,
  version_group_details: VersionGroupDetail[]
}

interface Move {
  name: string
  url: string
}

interface VersionGroupDetail {
  level_learned_at: number
  move_learn_method: MoveLearnMethod
  order: number
  version_group: VersionGroup
}

interface MoveLearnMethod {
  name: string
  url: string
}

interface VersionGroup {
  name: string
  url: string
}

type Stats = {
  hp: number
  attack: number
  defense: number
  specialAttack: number
  specialDefense: number
  speed: number
}

export default function Details () {
  const params = useParams()
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)

  useEffect(() => {
    axios.get(`${BaseUrl}/${params.name}`)
      .then(res => {
        setPokemon({
          id: res.data.id,
          name: res.data.name,
          image: res.data.sprites.other['official-artwork'].front_default,
          types: res.data.types.map((type: Type) => type.type.name),
          moves: res.data.moves.map((move: Moves) => move.move.name).slice(0, 10),
          stats: {
            hp: res.data.stats[0].base_stat,
            attack: res.data.stats[1].base_stat,
            defense: res.data.stats[2].base_stat,
            specialAttack: res.data.stats[3].base_stat,
            specialDefense: res.data.stats[4].base_stat,
            speed: res.data.stats[5].base_stat
          }
        })
      })
      .catch(err => console.error(err))
  }, [params.name])

  if (!pokemon) return <p>Cargando...</p>

  return (
    <div className="container mx-auto p-4">
      <Link to='/dex' className="text-blue-500 underline block mb-4">⬅ Volver</Link>

      <div className="flex flex-col items-center">
        <PokemonCard {...pokemon} />
      </div>
    </div>
  )
}
