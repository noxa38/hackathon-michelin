export interface ProfessionalRequest {
  id: number
  userId: number
  restaurantId: number
  proofDocumentUrl: string
  status: 'pending' | 'approved' | 'rejected'
  rejectionReason?: string
  createdAt: string
  updatedAt: string
  // Fields for display
  firstName?: string
  lastName?: string
  email?: string
  restaurantName?: string
}

export interface ProfessionalRestaurant {
  id: number
  userId: number
  restaurantId: number
  restaurant_id?: number
  name?: string
  address?: string
  city?: string
  country?: string
  cuisine?: string
  phone?: string
  phone_number?: string
  award?: string
  opening_hours?: string
  hours?: Record<string, unknown> | string
  menu?: Record<string, unknown> | string
  description?: string
  prices?: Record<string, unknown>
  photos?: string[]
  createdAt: string
  updatedAt: string
}

export interface ProfessionalFormData {
  restaurantId: number
  proofDocumentUrl: string
}

export interface AdminStatistics {
  totalUsers: number
  totalRestaurants: number
  totalAccommodations: number
}

export interface CreateAdminPayload {
  email: string
  username: string
  password: string
  firstName: string
  lastName: string
}

export interface AdminManagedUser {
  id: number
  email: string
  username: string
  firstName: string
  lastName: string
  userType: 'individual' | 'professional' | 'admin'
  createdAt: string
}

export interface AdminManagedUserPayload {
  email: string
  username: string
  password?: string
  firstName: string
  lastName: string
  userType: 'individual' | 'professional' | 'admin'
}
