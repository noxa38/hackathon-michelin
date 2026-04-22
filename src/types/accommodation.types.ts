export interface HotelRoomDetail {
  room_type: string
  description?: string
  price_per_night?: number
  capacity?: number
  amenities?: string
  photo_url?: string
}

export interface Accommodation {
  id: string
  source?: 'hotels' | 'accommodations'
  name: string
  city: string
  category: string
  address: string
  image_url?: string
  image_urls?: string[]
  room_details?: HotelRoomDetail[]
  photo_url?: string
  country?: string
  stars?: number
  rating_stars?: number
  latitude?: number
  longitude?: number
  phone?: string
  description?: string
  facilities?: string
  price_from?: number
}
