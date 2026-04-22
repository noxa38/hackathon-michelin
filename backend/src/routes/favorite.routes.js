import { Router } from 'express'
import { 
  addFavoriteHandler, 
  removeFavoriteHandler, 
  checkFavoriteHandler, 
  getUserFavoritesHandler, 
  getFavoriteCountHandler,
  getUserFavoriteIdsHandler,
  addAccommodationFavoriteHandler,
  removeAccommodationFavoriteHandler,
  getUserAccommodationFavoritesHandler,
  getAccommodationFavoriteCountHandler,
  getUserAccommodationFavoriteIdsHandler,
} from '../controllers/favorite.controller.js'
import { authenticateToken } from '../middleware/auth.middleware.js'

const router = Router()

// All favorite routes require authentication
router.use(authenticateToken)

// Restaurant favorites
router.post('/add', addFavoriteHandler)
router.post('/remove', removeFavoriteHandler)
router.get('/check', checkFavoriteHandler)
router.get('/list', getUserFavoritesHandler)
router.get('/count', getFavoriteCountHandler)
router.get('/ids', getUserFavoriteIdsHandler)

// Accommodation favorites
router.post('/accommodation/add', addAccommodationFavoriteHandler)
router.post('/accommodation/remove', removeAccommodationFavoriteHandler)
router.get('/accommodation/list', getUserAccommodationFavoritesHandler)
router.get('/accommodation/count', getAccommodationFavoriteCountHandler)
router.get('/accommodation/ids', getUserAccommodationFavoriteIdsHandler)

export default router
