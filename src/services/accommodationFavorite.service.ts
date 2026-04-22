const API_BASE = '/api/favorites'

export const addAccommodationFavorite = async (token: string, accommodationId: number): Promise<void> => {
  const response = await fetch(`${API_BASE}/accommodation/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ accommodationId }),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to add accommodation favorite')
  }
}

export const removeAccommodationFavorite = async (token: string, accommodationId: number): Promise<void> => {
  const response = await fetch(`${API_BASE}/accommodation/remove`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ accommodationId }),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to remove accommodation favorite')
  }
}

export const getUserAccommodationFavorites = async (token: string): Promise<any[]> => {
  const response = await fetch(`${API_BASE}/accommodation/list`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  if (!response.ok) throw new Error('Failed to fetch accommodation favorites')
  return response.json()
}

export const getAccommodationFavoriteCount = async (token: string): Promise<number> => {
  const response = await fetch(`${API_BASE}/accommodation/count`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  if (!response.ok) throw new Error('Failed to get accommodation favorite count')
  const data = await response.json()
  return data.count
}

export const getUserAccommodationFavoriteIds = async (token: string): Promise<number[]> => {
  const response = await fetch(`${API_BASE}/accommodation/ids`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  if (!response.ok) throw new Error('Failed to fetch accommodation favorite IDs')
  const data = await response.json()
  return data.favoriteIds
}
