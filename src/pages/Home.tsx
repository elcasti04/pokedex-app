import { useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { useName } from '../hooks/useName'

export default function Home () {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [error, setError] = useState('')
  const { setName } = useName()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const value = inputRef.current?.value

    if (!value || value.trim() === '') {
      setError('Por favor ingresa un nombre válido')
      return
    }

    setName(value.trim())
    inputRef.current!.value = ''
    navigate('/dex')
  }

  return (
    <div className='min-h-dvh grid place-items-center'>
      <div className='space-y-3'>
        <h1 className='text-3xl font-bold text-center '>Pokédex</h1>
        <p className='text-center'>Bienvenido a esta pokeAventura, Cual es tu pokeNombre?</p>

        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            className='py-2 px-4 border border-gray-300 rounded block w-full mb-4'
            placeholder='Ingresa tu nombre'
          />
          <button type='submit' className='bg-red-400 text-white rounded px-4 py-2 w-full cursor-pointer hover:bg-red-500 transition-colors duration-300 mb-4'>
            PokeIniciar
          </button>

          {error && <p className='text-center text-sm text-red-500'>{error}</p>}
        </form>
      </div>
    </div>
  )
}