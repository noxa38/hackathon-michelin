import type { Restaurant } from './restaurant.types'
import type { Accommodation } from './accommodation.types'

export interface FriendSearchResult {
  id: number
  username: string
  firstName: string
  lastName: string
  userType: 'individual' | 'professional' | 'admin'
  createdAt: string
  relationshipStatus: 'none' | 'friend' | 'outgoing_pending' | 'incoming_pending'
  isFriend: boolean
}

export interface FriendRequestItem {
  id: number
  createdAt: string
  sender: {
    id: number
    username: string
    firstName: string
    lastName: string
    userType: 'individual' | 'professional' | 'admin'
  }
}

export interface FriendListItem {
  id: number
  username: string
  firstName: string
  lastName: string
  userType: 'individual' | 'professional' | 'admin'
  createdAt: string
  friendSince: string
  stats: {
    likedRestaurants: number
    likedAccommodations: number
  }
}

export interface FriendPublicProfile {
  user: {
    id: number
    username: string
    firstName: string
    lastName: string
    userType: 'individual' | 'professional' | 'admin'
    createdAt: string
  }
  stats: {
    likedRestaurants: number
    likedAccommodations: number
  }
  favoriteRestaurants: Restaurant[]
  favoriteAccommodations: Accommodation[]
}
