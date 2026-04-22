import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import * as authService from '../services/auth.service'
import { type User } from '../types/auth.types'

interface AuthContextType {
  isAuthenticated: boolean
  loading: boolean
  user: User | null
  login: (token: string, user: User) => void
  logout: () => void
  updateUser: (user: User) => void
  userType: 'individual' | 'professional' | 'admin' | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = authService.getToken()
    const storedUser = authService.getUser()
    
    if (token && storedUser) {
      authService
        .verifyToken(token)
        .then(() => {
          setIsAuthenticated(true)
          setUser(storedUser)
        })
        .catch(() => {
          authService.removeToken()
          authService.removeUser()
          setIsAuthenticated(false)
          setUser(null)
        })
        .finally(() => setLoading(false))
    } else {
      setIsAuthenticated(false)
      setUser(null)
      setLoading(false)
    }
  }, [])

  const login = (token: string, userData: User) => {
    authService.saveToken(token)
    authService.saveUser(userData)
    setIsAuthenticated(true)
    setUser(userData)
  }

  const logout = () => {
    authService.removeToken()
    authService.removeUser()
    setIsAuthenticated(false)
    setUser(null)
  }

  const updateUser = (userData: User) => {
    setUser(userData)
    authService.saveUser(userData)
  }

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        loading, 
        user, 
        login, 
        logout, 
        updateUser,
        userType: user?.userType || null
      }}
    >
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
