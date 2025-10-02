import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import PokemonCard from "../components/PokemonCard"

const BaseUrl = "https://pokeapi.co/api/v2"

// Tipos que necesitamos
interface PokemonApiResponse {
  id: number
  name: string
  sprites: {
    other: {
      ["official-artwork"]: {
        front_default: string
      }
    }
  }
  types: { type: { name: string } }[]
  moves: { move: { name: string } }[]
  stats: { base_stat: number }[]
}

// Tipo formateado que pasaremos a <PokemonCard />
interface PokemonFormatted {
  id: number
  name: string
  image: string
  types: string[]
  moves: string[]
  stats: {
    hp: number
    attack: number
    defense: number
    specialAttack: number
    specialDefense: number
    speed: number
  }
}

export default function PokemonDetail() {
  const { name } = useParams<{ name: string }>()
  const [pokemon, setPokemon] = useState<PokemonFormatted | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (name) {
      axios.get<PokemonApiResponse>(`${BaseUrl}/pokemon/${name}`)
        .then((res) => {
          const data = res.data
          const formatted: PokemonFormatted = {
            id: data.id,
            name: data.name,
            image: data.sprites.other["official-artwork"].front_default,
            types: data.types.map((t) => t.type.name),
            moves: data.moves.map((m) => m.move.name),
            stats: {
              hp: data.stats[0]?.base_stat ?? 0,
              attack: data.stats[1]?.base_stat ?? 0,
              defense: data.stats[2]?.base_stat ?? 0,
              specialAttack: data.stats[3]?.base_stat ?? 0,
              specialDefense: data.stats[4]?.base_stat ?? 0,
              speed: data.stats[5]?.base_stat ?? 0,
            },
          }
          setPokemon(formatted)
        })
        .catch((err) => {
          console.error("Error fetching Pokémon:", err)
        })
    }
  }, [name])

  return (
    <div className="container mx-auto mt-10 flex flex-col items-center">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        ⬅ Volver
      </button>

      {pokemon ? (
        <PokemonCard {...pokemon} />
      ) : (
        <p>Cargando Pokémon...</p>
      )}
    </div>
  )
}
