import { Router } from 'express'
import { search, getById, nearby } from '../controllers/restaurant.controller.js'

const router = Router()

router.get('/', search)
router.get('/nearby', nearby)
router.get('/:id', getById)

export default router
