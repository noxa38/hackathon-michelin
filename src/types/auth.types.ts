export interface User {
  id: number
  email: string
  username: string
  firstName: string
  lastName: string
  avatarUrl?: string
  bio?: string
  preferences?: Record<string, unknown>
  createdAt: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  email: string
  username: string
  password: string
  passwordConfirm: string
  firstName: string
  lastName: string
}

export interface List {
  id: number
  userId: number
  name: string
  description?: string
  icon?: string
  color?: string
  isPublic: boolean
  createdAt: string
  restaurantCount?: number
}

export interface ListRestaurant {
  id: number
  listId: number
  restaurantId: number
  addedAt: string
}
