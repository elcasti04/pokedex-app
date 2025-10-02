import { useReducer } from 'react'
import NameContext from '../context/NameContext'

const SET_NAME = 'SET_NAME'
const CLEAR_NAME = 'CLEAR_NAME'

const initialState = localStorage.getItem('name') || ''

function reducer (state: string, action: any) {
  switch (action.type) {
    case SET_NAME:
      return state = action.payload
    case CLEAR_NAME:
      return state = ''
    default:
      return state
  }
}

export function NameProvider ({ children }: { children: React.ReactNode }) {
  const [name, dispatch] = useReducer(reducer, initialState)

  const setName = (name: string) => {
    dispatch({ type: SET_NAME, payload: name })
    localStorage.setItem('name', name)
  }

  const clearName = () => {
    dispatch({ type: CLEAR_NAME })
    localStorage.removeItem('name')
  }

  return (
    <NameContext.Provider value={{ name, setName, clearName }}>
      {children}
    </NameContext.Provider>
  )
}