export interface Accommodation {
  id: number
  name: string
  city: string
  category: string
  address: string
  image_url?: string
  country?: string
  stars?: number
  phone?: string
  description?: string
  facilities?: string
  price_from?: number
}
