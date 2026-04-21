import type { Restaurant } from '../types/restaurant.types'

const API_BASE = '/api'

export async function fetchAllRestaurants(): Promise<Restaurant[]> {
  const response = await fetch(`${API_BASE}/restaurants`)
  if (!response.ok) throw new Error('Failed to fetch restaurants')
  return response.json()
}

export async function fetchRestaurantById(id: number): Promise<Restaurant> {
  const response = await fetch(`${API_BASE}/restaurants/${id}`)
  if (!response.ok) throw new Error('Restaurant not found')
  return response.json()
}
