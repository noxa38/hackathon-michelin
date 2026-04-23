import express from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { isAdmin, isProfessionalOrAdmin } from "../middleware/role.middleware.js";
import {
  createProfessionalRequest,
  getProfessionalRequests,
  approveProfessionalRequest,
  rejectProfessionalRequest,
  getStatistics,
  createAdminUser,
  getProfessionalRestaurants,
  updateProfessionalRestaurant,
  getAdminUsers,
  createAdminManagedUser,
  updateAdminManagedUser,
  deleteAdminManagedUser,
} from "../controllers/professional.controller.js";

const router = express.Router();

// Professional routes
router.post("/professional/request", authenticateToken, createProfessionalRequest);
router.get("/professional/restaurants", authenticateToken, getProfessionalRestaurants);
router.put("/professional/restaurants/:restaurantId", authenticateToken, updateProfessionalRestaurant);

// Admin routes
router.get("/admin/professional-requests", authenticateToken, isAdmin, getProfessionalRequests);
router.post("/admin/professional-requests/:id/approve", authenticateToken, isAdmin, approveProfessionalRequest);
router.post("/admin/professional-requests/:id/reject", authenticateToken, isAdmin, rejectProfessionalRequest);
router.get("/admin/statistics", authenticateToken, isAdmin, getStatistics);
router.post("/admin/create-admin", authenticateToken, isAdmin, createAdminUser);
router.get("/admin/users", authenticateToken, isAdmin, getAdminUsers);
router.post("/admin/users", authenticateToken, isAdmin, createAdminManagedUser);
router.put("/admin/users/:id", authenticateToken, isAdmin, updateAdminManagedUser);
router.delete("/admin/users/:id", authenticateToken, isAdmin, deleteAdminManagedUser);

export default router;
