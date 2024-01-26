import { useContext } from 'react'
import { AuthContext, AuthDispatchContext } from './AuthContext'

export function useAuth() {
  return useContext(AuthContext)
}

export function useAuthDispatch() {
  return useContext(AuthDispatchContext)
}
