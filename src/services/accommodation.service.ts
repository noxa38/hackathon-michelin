import type { Accommodation } from '../types/accommodation.types'

const API_BASE = '/api'

export interface AccommodationSearchParams {
  q?: string
  city?: string
}

export async function fetchAccommodations(
  params: AccommodationSearchParams = {}
): Promise<Accommodation[]> {
  const searchParams = new URLSearchParams()

  if (params.q?.trim()) searchParams.set('q', params.q.trim())
  if (params.city?.trim()) searchParams.set('city', params.city.trim())

  const queryString = searchParams.toString()
  const response = await fetch(
    `${API_BASE}/accommodations${queryString ? `?${queryString}` : ''}`
  )

  if (!response.ok) throw new Error('Failed to fetch accommodations')
  return response.json()
}

export async function fetchAccommodationById(id: string): Promise<Accommodation> {
  const response = await fetch(`${API_BASE}/accommodations/${id}`)
  if (!response.ok) throw new Error('Accommodation not found')
  return response.json()
}

export interface AdminHotelPayload {
  name: string
  address?: string | null
  city?: string | null
  country?: string | null
  latitude?: number | null
  longitude?: number | null
  stars?: number | null
  phone?: string | null
  description?: string | null
  facilities?: string | null
  price_from?: number | null
  photo_url?: string | null
}

async function parseError(response: Response, fallbackMessage: string): Promise<Error> {
  try {
    const data = await response.json()
    return new Error(data.error || fallbackMessage)
  } catch {
    return new Error(fallbackMessage)
  }
}

export async function createHotelAsAdmin(token: string, data: AdminHotelPayload): Promise<Accommodation> {
  const response = await fetch(`${API_BASE}/accommodations/admin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw await parseError(response, 'Failed to create hotel')
  }

  return response.json()
}

export async function updateHotelAsAdmin(token: string, id: number, data: Partial<AdminHotelPayload>): Promise<Accommodation> {
  const response = await fetch(`${API_BASE}/accommodations/admin/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw await parseError(response, 'Failed to update hotel')
  }

  return response.json()
}

export async function deleteHotelAsAdmin(token: string, id: number): Promise<void> {
  const response = await fetch(`${API_BASE}/accommodations/admin/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw await parseError(response, 'Failed to delete hotel')
  }
}
