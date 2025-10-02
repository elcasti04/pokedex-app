import { Navigate, Outlet } from 'react-router'
import { useName } from '../hooks/useName'

export const Protected = ({ children }: { children: React.ReactNode }) => {
  const { name } = useName()

  if (!name) return <Navigate to='/' />

  return children ? children : <Outlet />
}