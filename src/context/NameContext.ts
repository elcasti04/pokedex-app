import { createContext } from 'react'

type NameContextType = {
  name: string
  setName: (name: string) => void
  clearName: () => void
}

const NameContext = createContext<NameContextType | undefined>(undefined)

export default NameContext