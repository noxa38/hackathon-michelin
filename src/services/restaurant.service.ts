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

export interface AdminRestaurantPayload {
  name: string
  address?: string | null
  location?: string | null
  city?: string | null
  country?: string | null
  price?: string | null
  cuisine?: string | null
  longitude?: number | null
  latitude?: number | null
  phone_number?: string | null
  michelin_url?: string | null
  website_url?: string | null
  award?: string | null
  stars?: number | null
  green_star?: number | null
  facilities?: string | null
  description?: string | null
  opening_hours?: string | null
}

async function parseError(response: Response, fallbackMessage: string): Promise<Error> {
  try {
    const data = await response.json()
    return new Error(data.message || fallbackMessage)
  } catch {
    return new Error(fallbackMessage)
  }
}

export async function createRestaurantAsAdmin(token: string, data: AdminRestaurantPayload): Promise<Restaurant> {
  const response = await fetch(`${API_BASE}/restaurants/admin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw await parseError(response, 'Failed to create restaurant')
  }

  return response.json()
}

export async function updateRestaurantAsAdmin(token: string, id: number, data: Partial<AdminRestaurantPayload>): Promise<Restaurant> {
  const response = await fetch(`${API_BASE}/restaurants/admin/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw await parseError(response, 'Failed to update restaurant')
  }

  return response.json()
}

export async function deleteRestaurantAsAdmin(token: string, id: number): Promise<void> {
  const response = await fetch(`${API_BASE}/restaurants/admin/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw await parseError(response, 'Failed to delete restaurant')
  }
}
