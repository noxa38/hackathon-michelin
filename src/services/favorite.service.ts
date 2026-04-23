import type { Restaurant } from '../types/restaurant.types'

const API_BASE = '/api/favorites'

export async function addFavorite(token: string, restaurantId: number): Promise<void> {
  const response = await fetch(`${API_BASE}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ restaurantId }),
  })
  if (!response.ok) throw new Error('Failed to add favorite')
}

export async function removeFavorite(token: string, restaurantId: number): Promise<void> {
  const response = await fetch(`${API_BASE}/remove`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ restaurantId }),
  })
  if (!response.ok) throw new Error('Failed to remove favorite')
}

export async function isFavorite(token: string, restaurantId: number): Promise<boolean> {
  const response = await fetch(`${API_BASE}/check?restaurantId=${restaurantId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  if (!response.ok) throw new Error('Failed to check favorite')
  const data = await response.json()
  return data.isFavorite
}

export async function getUserFavorites(token: string): Promise<Restaurant[]> {
  const response = await fetch(`${API_BASE}/list`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  if (!response.ok) throw new Error('Failed to fetch favorites')
  return response.json()
}

export async function getFavoriteCount(token: string): Promise<number> {
  const response = await fetch(`${API_BASE}/count`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  if (!response.ok) throw new Error('Failed to get favorite count')
  const data = await response.json()
  return data.count
}

export async function getUserFavoriteIds(token: string): Promise<number[]> {
  const response = await fetch(`${API_BASE}/ids`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  if (!response.ok) throw new Error('Failed to fetch favorite IDs')
  const data = await response.json()
  return data.favoriteIds
}
