import { useContext } from 'react'
import NameContext from '../context/NameContext'

export const useName = () => {
  const context = useContext(NameContext)
  if (!context) {
    throw new Error('useName debe usarse dentro de un <NameProvider>')
  }
  return context
}
