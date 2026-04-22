import type { List } from '../types/auth.types'

const API_BASE = '/api'

interface ListApiResponse {
  id: number
  user_id?: number
  userId?: number
  name: string
  description?: string
  icon?: string
  color?: string
  is_public?: boolean
  isPublic?: boolean
  created_at?: string
  createdAt?: string
  restaurant_count?: number | string
  restaurantCount?: number | string
  accommodation_count?: number | string
  accommodationCount?: number | string
  item_count?: number | string
  itemCount?: number | string
}

function normalizeList(list: ListApiResponse): List {
  return {
    id: Number(list.id),
    userId: Number(list.userId ?? list.user_id ?? 0),
    name: list.name,
    description: list.description || '',
    icon: list.icon,
    color: list.color,
    isPublic: Boolean(list.isPublic ?? list.is_public ?? false),
    createdAt: list.createdAt ?? list.created_at ?? new Date().toISOString(),
    restaurantCount: Number(list.restaurantCount ?? list.restaurant_count ?? 0),
    accommodationCount: Number(list.accommodationCount ?? list.accommodation_count ?? 0),
    itemCount: Number(
      list.itemCount
      ?? list.item_count
      ?? (Number(list.restaurantCount ?? list.restaurant_count ?? 0) + Number(list.accommodationCount ?? list.accommodation_count ?? 0))
    ),
  }
}

export async function getLists(token: string): Promise<List[]> {
  const response = await fetch(`${API_BASE}/lists`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  
  if (!response.ok) {
    const text = await response.text()
    throw new Error('Failed to fetch lists: ' + text)
  }
  
  const text = await response.text()
  return (JSON.parse(text) as ListApiResponse[]).map(normalizeList)
}

export async function getList(token: string, id: number): Promise<List> {
  const response = await fetch(`${API_BASE}/lists/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error('Failed to fetch list')
  return normalizeList(await response.json())
}

export async function createList(
  token: string,
  name: string,
  description?: string,
  icon?: string,
  color?: string
): Promise<List> {
  const response = await fetch(`${API_BASE}/lists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, description, icon, color }),
  })
  if (!response.ok) throw new Error('Failed to create list')
  return normalizeList(await response.json())
}

export async function updateList(
  token: string,
  id: number,
  data: Partial<List>
): Promise<List> {
  const response = await fetch(`${API_BASE}/lists/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Failed to update list')
  return normalizeList(await response.json())
}

export async function deleteList(token: string, id: number): Promise<void> {
  const response = await fetch(`${API_BASE}/lists/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error('Failed to delete list')
}

export async function addRestaurantToList(
  token: string,
  listId: number,
  restaurantId: number
): Promise<List> {
  const response = await fetch(`${API_BASE}/lists/${listId}/restaurants`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ restaurantId }),
  })
  if (!response.ok) throw new Error('Failed to add restaurant')
  return normalizeList(await response.json())
}

export async function removeRestaurantFromList(
  token: string,
  listId: number,
  restaurantId: number
): Promise<List> {
  const response = await fetch(`${API_BASE}/lists/${listId}/restaurants/${restaurantId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error('Failed to remove restaurant')
  return normalizeList(await response.json())
}

export async function findOrCreateList(token: string, name: string): Promise<List> {
  const response = await fetch(`${API_BASE}/lists/find-or-create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  })
  if (!response.ok) throw new Error('Failed to find or create list')
  return normalizeList(await response.json())
}

export async function getListRestaurants(
  token: string,
  listId: number
): Promise<Array<{ id: number }>> {
  const response = await fetch(`${API_BASE}/lists/${listId}/restaurants`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error('Failed to fetch list restaurants')
  return response.json()
}

export async function getListAccommodations(
  token: string,
  listId: number
): Promise<Array<{ id: number }>> {
  const response = await fetch(`${API_BASE}/lists/${listId}/accommodations`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error('Failed to fetch list accommodations')
  return response.json()
}

export async function addAccommodationToList(
  token: string,
  listId: number,
  accommodationId: number,
  accommodationSource: 'hotels' | 'accommodations' = 'hotels'
): Promise<void> {
  const response = await fetch(`${API_BASE}/lists/${listId}/accommodations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ accommodationId, accommodationSource }),
  })
  if (!response.ok) throw new Error('Failed to add accommodation to list')
}

export async function removeAccommodationFromList(
  token: string,
  listId: number,
  accommodationId: number
): Promise<void> {
  const response = await fetch(`${API_BASE}/lists/${listId}/accommodations/${accommodationId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error('Failed to remove accommodation from list')
}
