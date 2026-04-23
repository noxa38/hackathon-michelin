import express from "express";
import * as friendController from "../controllers/friend.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticateToken);

router.get("/search", friendController.searchUsers);
router.post("/add", friendController.addFriend);
router.get("/list", friendController.getFriends);
router.get("/:friendId/profile", friendController.getFriendProfile);

export default router;
