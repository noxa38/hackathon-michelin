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
