import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthContext } from '@/hooks/useAuth'

function RequiredAuth() {
  const { user } = useAuthContext()
  const location = useLocation()

  return user ? (
    <Outlet />
  ) : (
    <Navigate
      to="/sign-in"
      state={{ from: location }}
      replace
    />
  )
}

export default RequiredAuth
