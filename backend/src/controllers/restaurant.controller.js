import {
  getAllRestaurants,
  searchRestaurants,
  getRestaurantById,
  getNearbyRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
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

export async function createByAdmin(req, res) {
  try {
    const { name } = req.body
    if (!name || !String(name).trim()) {
      return res.status(400).json({ message: 'Le nom est requis' })
    }

    const newId = await createRestaurant({
      ...req.body,
      name: String(name).trim(),
    })

    const restaurant = await getRestaurantById(newId)
    return res.status(201).json(restaurant)
  } catch (error) {
    console.error('Admin create restaurant error:', error)
    return res.status(500).json({ message: 'Erreur lors de la création du restaurant' })
  }
}

export async function updateByAdmin(req, res) {
  try {
    const restaurantId = Number(req.params.id)
    if (!Number.isFinite(restaurantId)) {
      return res.status(400).json({ message: 'ID restaurant invalide' })
    }

    const existing = await getRestaurantById(restaurantId)
    if (!existing) {
      return res.status(404).json({ message: 'Restaurant introuvable' })
    }

    await updateRestaurant(restaurantId, req.body)
    const updated = await getRestaurantById(restaurantId)
    return res.json(updated)
  } catch (error) {
    console.error('Admin update restaurant error:', error)
    return res.status(500).json({ message: 'Erreur lors de la mise à jour du restaurant' })
  }
}

export async function deleteByAdmin(req, res) {
  try {
    const restaurantId = Number(req.params.id)
    if (!Number.isFinite(restaurantId)) {
      return res.status(400).json({ message: 'ID restaurant invalide' })
    }

    const existing = await getRestaurantById(restaurantId)
    if (!existing) {
      return res.status(404).json({ message: 'Restaurant introuvable' })
    }

    await deleteRestaurant(restaurantId)
    return res.status(204).send()
  } catch (error) {
    console.error('Admin delete restaurant error:', error)
    return res.status(500).json({ message: 'Erreur lors de la suppression du restaurant' })
  }
}
