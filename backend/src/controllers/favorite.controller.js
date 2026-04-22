import {
  addFavorite,
  removeFavorite,
  isFavorite,
  getUserFavorites,
  getFavoriteCount,
  getUserFavoritesWithIds,
  addAccommodationFavorite,
  removeAccommodationFavorite,
  isAccommodationFavorite,
  getUserAccommodationFavorites,
  getAccommodationFavoriteCount,
  getUserAccommodationFavoritesWithIds,
} from '../models/favorite.model.js'

export async function addFavoriteHandler(req, res) {
  try {
    const { restaurantId } = req.body
    const userId = req.user.id

    if (!restaurantId) {
      return res.status(400).json({ message: 'Restaurant ID required' })
    }

    const alreadyFavorite = await isFavorite(userId, restaurantId)
    if (alreadyFavorite) {
      return res.status(409).json({ message: 'Already added to favorites' })
    }

    await addFavorite(userId, restaurantId)
    res.json({ message: 'Restaurant added to favorites' })
  } catch (error) {
    console.error('Error adding favorite:', error)
    res.status(500).json({ message: 'Failed to add favorite' })
  }
}

export async function removeFavoriteHandler(req, res) {
  try {
    const { restaurantId } = req.body
    const userId = req.user.id

    if (!restaurantId) {
      return res.status(400).json({ message: 'Restaurant ID required' })
    }

    const isFav = await isFavorite(userId, restaurantId)
    if (!isFav) {
      return res.status(404).json({ message: 'Not in favorites' })
    }

    await removeFavorite(userId, restaurantId)
    res.json({ message: 'Restaurant removed from favorites' })
  } catch (error) {
    console.error('Error removing favorite:', error)
    res.status(500).json({ message: 'Failed to remove favorite' })
  }
}

export async function checkFavoriteHandler(req, res) {
  try {
    const { restaurantId } = req.query
    const userId = req.user.id

    if (!restaurantId) {
      return res.status(400).json({ message: 'Restaurant ID required' })
    }

    const isFav = await isFavorite(userId, restaurantId)
    res.json({ isFavorite: isFav })
  } catch (error) {
    console.error('Error checking favorite:', error)
    res.status(500).json({ message: 'Failed to check favorite' })
  }
}

export async function getUserFavoritesHandler(req, res) {
  try {
    const userId = req.user.id
    const favorites = await getUserFavorites(userId)
    res.json(favorites)
  } catch (error) {
    console.error('Error fetching user favorites:', error)
    res.status(500).json({ message: 'Failed to fetch favorites' })
  }
}

export async function getFavoriteCountHandler(req, res) {
  try {
    const userId = req.user.id
    const count = await getFavoriteCount(userId)
    res.json({ count })
  } catch (error) {
    console.error('Error getting favorite count:', error)
    res.status(500).json({ message: 'Failed to get favorite count' })
  }
}

export async function getUserFavoriteIdsHandler(req, res) {
  try {
    const userId = req.user.id
    const favoriteIds = await getUserFavoritesWithIds(userId)
    res.json({ favoriteIds })
  } catch (error) {
    console.error('Error fetching user favorite IDs:', error)
    res.status(500).json({ message: 'Failed to fetch favorite IDs' })
  }
}

// Accommodation favorite handlers
export async function addAccommodationFavoriteHandler(req, res) {
  try {
    const { accommodationId } = req.body
    const userId = req.user.id

    if (!accommodationId) {
      return res.status(400).json({ message: 'Accommodation ID required' })
    }

    const alreadyFavorite = await isAccommodationFavorite(userId, accommodationId)
    if (alreadyFavorite) {
      return res.status(409).json({ message: 'Already added to favorites' })
    }

    await addAccommodationFavorite(userId, accommodationId)
    res.json({ message: 'Accommodation added to favorites' })
  } catch (error) {
    console.error('Error adding accommodation favorite:', error)
    res.status(500).json({ message: 'Failed to add favorite' })
  }
}

export async function removeAccommodationFavoriteHandler(req, res) {
  try {
    const { accommodationId } = req.body
    const userId = req.user.id

    if (!accommodationId) {
      return res.status(400).json({ message: 'Accommodation ID required' })
    }

    const isFav = await isAccommodationFavorite(userId, accommodationId)
    if (!isFav) {
      return res.status(404).json({ message: 'Not in favorites' })
    }

    await removeAccommodationFavorite(userId, accommodationId)
    res.json({ message: 'Accommodation removed from favorites' })
  } catch (error) {
    console.error('Error removing accommodation favorite:', error)
    res.status(500).json({ message: 'Failed to remove favorite' })
  }
}

export async function getUserAccommodationFavoritesHandler(req, res) {
  try {
    const userId = req.user.id
    const favorites = await getUserAccommodationFavorites(userId)
    res.json(favorites)
  } catch (error) {
    console.error('Error fetching user accommodation favorites:', error)
    res.status(500).json({ message: 'Failed to fetch accommodation favorites' })
  }
}

export async function getAccommodationFavoriteCountHandler(req, res) {
  try {
    const userId = req.user.id
    const count = await getAccommodationFavoriteCount(userId)
    res.json({ count })
  } catch (error) {
    console.error('Error getting accommodation favorite count:', error)
    res.status(500).json({ message: 'Failed to get accommodation favorite count' })
  }
}

export async function getUserAccommodationFavoriteIdsHandler(req, res) {
  try {
    const userId = req.user.id
    const favoriteIds = await getUserAccommodationFavoritesWithIds(userId)
    res.json({ favoriteIds })
  } catch (error) {
    console.error('Error fetching user accommodation favorite IDs:', error)
    res.status(500).json({ message: 'Failed to fetch accommodation favorite IDs' })
  }
}
