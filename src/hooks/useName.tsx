import { useContext } from 'react'
import NameContext from '../context/NameContext'

export const useName = () => useContext(NameContext)