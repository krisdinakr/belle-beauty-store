import { Dispatch, ReactNode, createContext, useReducer } from 'react'

interface IAuthProviderProps {
  children: ReactNode
}

interface IUser {
  id: string
  email: string
  firstName: string
  lastName: string
}

export const AuthContext = createContext<IUser | null>(null)

export const AuthDispatchContext = createContext<Dispatch<{ type: string; data: IUser }> | null>(
  null
)

export function AuthProvider({ children }: IAuthProviderProps) {
  const [user, dispatch] = useReducer(userReducer, null)

  return (
    <AuthContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthContext.Provider>
  )
}

function userReducer(user: IUser | null, action: { type: string; data: IUser }) {
  switch (action.type) {
    case 'login': {
      return {
        ...user,
        id: action.data.id,
        email: action.data.email,
        firstName: action.data.firstName,
        lastName: action.data.lastName,
      }
    }
    case 'logout': {
      return null
    }
    default: {
      return null
    }
  }
}
