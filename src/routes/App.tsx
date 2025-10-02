import { Routes, Route } from 'react-router'
import Home from '../pages/Home'
import Dex from '../pages/Dex'
import Details from '../pages/Details'
import { Protected } from './Protected'
import MainLayout from './MainLayout'

function App() {
  return (
    <Routes>
      {/* Página inicial */}
      <Route path="/" element={<Home />} />

      {/* Sección protegida */}
      <Route
        path="/dex"
        element={
          <Protected>
            <MainLayout />
          </Protected>
        }
      >
        {/* Página principal del Dex */}
        <Route index element={<Dex />} />

        {/* Página de detalles de cada Pokémon */}
        <Route path=":name" element={<Details />} />
      </Route>

      {/* Manejo de rutas no encontradas */}
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  )
}

export default App
