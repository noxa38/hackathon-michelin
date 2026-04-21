import { searchAccommodations, getAccommodationById } from '../models/accommodation.model.js'

export async function search(req, res) {
  const { q = '', city = '' } = req.query
  const results = await searchAccommodations(q, city)
  res.json(results)
}

export async function getById(req, res) {
  const accommodation = await getAccommodationById(req.params.id)
  if (!accommodation) return res.status(404).json({ message: 'Hébergement introuvable' })
  res.json(accommodation)
}
