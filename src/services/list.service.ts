import type { List } from '../types/auth.types'

const API_BASE = '/api'

export async function getLists(token: string): Promise<List[]> {
  const response = await fetch(`${API_BASE}/lists`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  
  if (!response.ok) {
    const text = await response.text()
    throw new Error('Failed to fetch lists: ' + text)
  }
  
  const text = await response.text()
  return JSON.parse(text)
}

export async function getList(token: string, id: number): Promise<List> {
  const response = await fetch(`${API_BASE}/lists/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error('Failed to fetch list')
  return response.json()
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
  return response.json()
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
  return response.json()
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
  return response.json()
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
  return response.json()
}
