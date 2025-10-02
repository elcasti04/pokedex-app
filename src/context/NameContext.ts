import { createContext, useContext } from "react"

type NameContextType = {
  name: string
  setName: (name: string) => void
  clearName: () => void
}

const NameContext = createContext<NameContextType | null>(null)

export const useName = () => {
  const ctx = useContext(NameContext)
  if (!ctx) {
    throw new Error("useName debe usarse dentro de un <NameProvider>")
  }
  return ctx
}

export default NameContext
