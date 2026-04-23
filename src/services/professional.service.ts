import type { 
  ProfessionalRequest, 
  ProfessionalRestaurant, 
  ProfessionalFormData,
  AdminStatistics,
  CreateAdminPayload,
  AdminManagedUser,
  AdminManagedUserPayload,
} from '../types/professional.types'

const API_BASE = '/api'

export async function createProfessionalRequest(
  token: string, 
  data: ProfessionalFormData
): Promise<{ message: string; requestId: number }> {
  const response = await fetch(`${API_BASE}/professional/request`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to create professional request')
  }

  return response.json()
}

export async function getProfessionalRequests(token: string): Promise<ProfessionalRequest[]> {
  const response = await fetch(`${API_BASE}/admin/professional-requests`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch professional requests')
  }

  return response.json()
}

export async function approveProfessionalRequest(
  token: string,
  requestId: number
): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE}/admin/professional-requests/${requestId}/approve`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to approve request')
  }

  return response.json()
}

export async function rejectProfessionalRequest(
  token: string,
  requestId: number,
  rejectionReason: string
): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE}/admin/professional-requests/${requestId}/reject`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ rejectionReason }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to reject request')
  }

  return response.json()
}

export async function getAdminStatistics(token: string): Promise<AdminStatistics> {
  const response = await fetch(`${API_BASE}/admin/statistics`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch statistics')
  }

  return response.json()
}

export async function createAdminUser(
  token: string,
  data: CreateAdminPayload
): Promise<{ message: string; userId: number }> {
  const response = await fetch(`${API_BASE}/admin/create-admin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to create admin user')
  }

  return response.json()
}

export async function getProfessionalRestaurants(token: string): Promise<ProfessionalRestaurant[]> {
  const response = await fetch(`${API_BASE}/professional/restaurants`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch professional restaurants')
  }

  return response.json()
}

export async function updateProfessionalRestaurant(
  token: string,
  restaurantId: number,
  data: Partial<Omit<ProfessionalRestaurant, 'id' | 'userId' | 'restaurantId' | 'createdAt' | 'updatedAt'>>
): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE}/professional/restaurants/${restaurantId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to update restaurant')
  }

  return response.json()
}

export async function getAdminUsers(token: string): Promise<AdminManagedUser[]> {
  const response = await fetch(`${API_BASE}/admin/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || 'Failed to fetch users')
  }

  return response.json()
}

export async function createAdminManagedUser(
  token: string,
  data: AdminManagedUserPayload
): Promise<AdminManagedUser> {
  const response = await fetch(`${API_BASE}/admin/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || 'Failed to create user')
  }

  return response.json()
}

export async function updateAdminManagedUser(
  token: string,
  userId: number,
  data: Partial<AdminManagedUserPayload>
): Promise<AdminManagedUser> {
  const response = await fetch(`${API_BASE}/admin/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || 'Failed to update user')
  }

  return response.json()
}

export async function deleteAdminManagedUser(token: string, userId: number): Promise<void> {
  const response = await fetch(`${API_BASE}/admin/users/${userId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || 'Failed to delete user')
  }
}
