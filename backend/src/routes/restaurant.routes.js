import { Router } from 'express'
import { authenticateToken } from '../middleware/auth.middleware.js'
import { isAdmin } from '../middleware/role.middleware.js'
import {
	search,
	getById,
	nearby,
	createByAdmin,
	updateByAdmin,
	deleteByAdmin,
} from '../controllers/restaurant.controller.js'

const router = Router()

router.get('/', search)
router.get('/nearby', nearby)
router.post('/admin', authenticateToken, isAdmin, createByAdmin)
router.put('/admin/:id', authenticateToken, isAdmin, updateByAdmin)
router.delete('/admin/:id', authenticateToken, isAdmin, deleteByAdmin)
router.get('/:id', getById)

export default router
