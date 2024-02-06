import { ReactNode, createContext, useState, Dispatch, SetStateAction } from 'react'

interface IAuthProviderProps {
  children: ReactNode
}

interface IUser {
  id: string
  email: string
  firstName: string
  lastName: string
}

interface IAuthContextProps {
  user: IUser | null
  setUser: Dispatch<SetStateAction<IUser | null>>
}

export const AuthContext = createContext<IAuthContextProps>({ user: null, setUser: () => {} })

export function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<IUser | null>(null)

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}
