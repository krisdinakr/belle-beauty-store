import { ReactNode, createContext, useRef, MutableRefObject } from 'react'

interface IAuthProviderProps {
  children: ReactNode
}

interface IUser {
  id: string
  email: string
  firstName: string
  lastName: string
}

// interface IToken {
//   value: string | null
//   setToken: (token: string) => void
// }

// interface IAuth {
//   token: IToken
//   user: IUser | null
//   reset: () => void
// }

// const auth = {
//   token: {
//     value: localStorage.getItem('token'),
//     setToken: (token: string) => localStorage.setItem('token', token),
//   },
//   user: null,
//   reset: () => {
//     localStorage.removeItem('token')
//     auth.user = null
//   },
// }

export const AuthContext = createContext<MutableRefObject<IUser | null>>({ current: null })

export function AuthProvider({ children }: IAuthProviderProps) {
  const user = useRef<IUser | null>(null)

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}
