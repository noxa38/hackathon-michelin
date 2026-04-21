import { getAllRestaurants, searchRestaurants, getRestaurantById } from '../models/restaurant.model.js'

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
