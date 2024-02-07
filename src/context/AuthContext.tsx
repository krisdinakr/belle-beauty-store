import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react'

interface IAuthProviderProps {
  children: ReactNode
}

interface IAuth {
  user: string | null
  token: string | null
  isAuth: boolean
}

interface IAuthContextProps extends IAuth {
  setAuth: Dispatch<SetStateAction<IAuth>>
}

const user = localStorage.getItem('user')
const token = localStorage.getItem('token')

export const AuthContext = createContext<IAuthContextProps | null>(null)

export function AuthProvider({ children }: IAuthProviderProps) {
  const [auth, setAuth] = useState({
    user,
    token,
    isAuth: !!user && !!token,
  })

  return <AuthContext.Provider value={{ ...auth, setAuth }}>{children}</AuthContext.Provider>
}
