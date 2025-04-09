import { createContext, useContext } from 'react'

export interface AuthContextType {
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const useSession = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider')
  }
  return context
}
