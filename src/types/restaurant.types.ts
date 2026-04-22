export interface RestaurantPhoto {
  url: string
  caption?: string
  position: number
}

export interface Restaurant {
  id: number
  name: string
  address: string
  location: string
  city: string
  price: string
  cuisine: string
  longitude: number
  latitude: number
  phone_number: string
  michelin_url: string
  website_url: string
  award: string
  stars: number
  green_star: number
  facilities: string
  description: string
  opening_hours?: string
  photos?: RestaurantPhoto[]
}

export interface RestaurantNearby {
  id: number
  name: string
  city: string
  latitude: number
  longitude: number
  distance_km: number
}
