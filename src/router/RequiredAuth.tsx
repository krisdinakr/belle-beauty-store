import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthContext } from '@/hooks/useAuth'

function RequiredAuth() {
  const auth = useAuthContext()
  const location = useLocation()

  return auth?.isAuth ? (
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
