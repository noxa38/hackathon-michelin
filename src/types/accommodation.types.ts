export interface HotelRoomDetail {
  room_type: string
  description?: string
  price_per_night?: number
  capacity?: number
  amenities?: string
  photo_url?: string
}

export interface Accommodation {
  id: number | string
  source?: 'accommodation'
  name: string
  city: string
  category?: string
  address: string
  image_url?: string
  image_urls?: string[]
  room_details?: HotelRoomDetail[]
  photo_url?: string
  country?: string
  award?: string
  stars?: number
  rating_stars?: number
  latitude?: number
  longitude?: number
  phone?: string
  website_url?: string
  description?: string
  facilities?: string
  price_from?: number
  opening_hours?: string
}
