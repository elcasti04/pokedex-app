import { Outlet } from 'react-router'
import { useName } from '../hooks/useName'

function MainLayout () {
  const { name, clearName } = useName()

  return (
    <>
      <header className='p-4 bg-white shadow-md flex justify-between items-center'>
        <p>Hola <span className='text-smibold'>{name}</span>, Aquí encontrarás tus pokémon favoritos</p>
        <button className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer' onClick={clearName}>
          Salir
        </button>
      </header>
      <main className='p-4'>
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout