import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import * as authService from '../services/auth.service'

interface AuthContextType {
  isAuthenticated: boolean
  loading: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = authService.getToken()
    if (token) {
      authService
        .verifyToken(token)
        .then(() => setIsAuthenticated(true))
        .catch(() => {
          authService.removeToken()
          setIsAuthenticated(false)
        })
        .finally(() => setLoading(false))
    } else {
      setIsAuthenticated(false)
      setLoading(false)
    }
  }, [])

  const login = (token: string) => {
    authService.saveToken(token)
    setIsAuthenticated(true)
  }

  const logout = () => {
    authService.removeToken()
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
