import express from "express";
import * as listController from "../controllers/list.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticateToken);

router.get("/", listController.getLists);
router.post("/", listController.createList);
router.post("/find-or-create", listController.findOrCreate);
router.get("/:id", listController.getList);
router.put("/:id", listController.updateList);
router.delete("/:id", listController.deleteList);

router.get("/:listId/restaurants", listController.getListRestaurants);
router.post("/:listId/restaurants", listController.addRestaurant);
router.delete("/:listId/restaurants/:restaurantId", listController.removeRestaurant);

router.get("/:listId/accommodations", listController.getListAccommodations);
router.post("/:listId/accommodations", listController.addAccommodation);
router.delete("/:listId/accommodations/:accommodationId", listController.removeAccommodation);

export default router;
