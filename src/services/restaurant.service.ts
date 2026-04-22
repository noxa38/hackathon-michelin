import type { Restaurant, RestaurantNearby } from '../types/restaurant.types'

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

export async function fetchNearbyRestaurants(
  latitude: number,
  longitude: number,
  radiusKm = 20,
  limit = 12
): Promise<RestaurantNearby[]> {
  const query = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    radiusKm: String(radiusKm),
    limit: String(limit),
  })

  const response = await fetch(`${API_BASE}/restaurants/nearby?${query.toString()}`)
  if (!response.ok) throw new Error('Failed to fetch nearby restaurants')
  return response.json()
}
