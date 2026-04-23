import express from "express";
import * as accommodationController from "../controllers/accommodation.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/", accommodationController.getAccommodations);
router.post("/admin", authenticateToken, isAdmin, accommodationController.createAccommodationByAdmin);
router.put("/admin/:id", authenticateToken, isAdmin, accommodationController.updateAccommodationByAdmin);
router.delete("/admin/:id", authenticateToken, isAdmin, accommodationController.deleteAccommodationByAdmin);
router.get("/:id", accommodationController.getAccommodationById);

export default router;
