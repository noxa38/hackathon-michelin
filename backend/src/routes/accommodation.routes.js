import express from "express";
import * as accommodationController from "../controllers/accommodation.controller.js";

const router = express.Router();

router.get("/", accommodationController.getAccommodations);
router.get("/:id", accommodationController.getAccommodationById);

export default router;
