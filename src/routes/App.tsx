import { Routes, Route } from 'react-router'
import Home from '../pages/Home'
import Dex from '../pages/Dex'
import Details from '../pages/Details'
import { Protected } from './Protected'
import MainLayout from './MainLayout'

function App () {
  return (
    <Routes>
      <Route path='/' element={<Home />} />

      <Route path='/dex' element={
        <Protected>
          <MainLayout />
        </Protected>
      }>
        <Route index element={<Dex />} />
        <Route path=':name' element={<Details />} />
      </Route>

      <Route path='*' element={<h1>Not Found</h1>} />
    </Routes>
  )
}

export default App
