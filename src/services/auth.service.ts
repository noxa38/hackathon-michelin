import type { User, AuthResponse, LoginPayload, RegisterPayload } from '../types/auth.types'

const API_BASE = '/api'

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  
  if (!response.ok) {
    const text = await response.text()
    try {
      const error = JSON.parse(text)
      throw new Error(error.error || 'Registration failed')
    } catch {
      throw new Error(`Registration failed with status ${response.status}: ${text}`)
    }
  }
  
  const text = await response.text()
  
  try {
    const result = JSON.parse(text)
    return result
  } catch {
    throw new Error('Invalid JSON response from server')
  }
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  
  if (!response.ok) {
    const text = await response.text()
    try {
      const error = JSON.parse(text)
      throw new Error(error.error || 'Login failed')
    } catch {
      throw new Error(`Login failed with status ${response.status}: ${text}`)
    }
  }
  
  const text = await response.text()
  
  try {
    const result = JSON.parse(text)
    return result
  } catch {
    throw new Error('Invalid JSON response from server')
  }
}

export async function getProfile(token: string): Promise<User> {
  const response = await fetch(`${API_BASE}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error('Failed to fetch profile')
  return response.json()
}

export async function updateProfile(token: string, data: Partial<User>): Promise<User> {
  const response = await fetch(`${API_BASE}/auth/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Failed to update profile')
  return response.json()
}

export async function verifyToken(token: string): Promise<User> {
  const response = await fetch(`${API_BASE}/auth/verify`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error('Token verification failed')
  return response.json()
}

export function saveToken(token: string): void {
  localStorage.setItem('auth_token', token)
}

export function getToken(): string | null {
  return localStorage.getItem('auth_token')
}

export function removeToken(): void {
  localStorage.removeItem('auth_token')
}

export function saveUser(user: User): void {
  localStorage.setItem('auth_user', JSON.stringify(user))
}

export function getUser(): User | null {
  const user = localStorage.getItem('auth_user')
  return user ? JSON.parse(user) : null
}

export function removeUser(): void {
  localStorage.removeItem('auth_user')
}
