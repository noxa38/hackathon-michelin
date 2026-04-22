import {
  getAllRestaurants,
  searchRestaurants,
  getRestaurantById,
  getNearbyRestaurants
} from '../models/restaurant.model.js'

export async function search(req, res) {
  const { q = '', city = '' } = req.query
  if (!q && !city) {
    const results = await getAllRestaurants()
    return res.json(results)
  }
  const results = await searchRestaurants(q, city)
  res.json(results)
}

export async function getById(req, res) {
  const restaurant = await getRestaurantById(req.params.id)
  if (!restaurant) return res.status(404).json({ message: 'Restaurant introuvable' })
  res.json(restaurant)
}

export async function nearby(req, res) {
  const latitude = Number(req.query.latitude)
  const longitude = Number(req.query.longitude)
  const radiusKm = Number(req.query.radiusKm ?? 20)
  const limit = Number(req.query.limit ?? 12)

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return res.status(400).json({ message: 'latitude/longitude invalides' })
  }

  const results = await getNearbyRestaurants(latitude, longitude, radiusKm, limit)
  res.json(results)
}
