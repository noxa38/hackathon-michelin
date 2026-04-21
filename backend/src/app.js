import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import restaurantRoutes from "./routes/restaurant.routes.js";
import accommodationRoutes from "./routes/accommodation.routes.js";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

app.use("/api/restaurants", restaurantRoutes);
app.use("/api/accommodations", accommodationRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "API Michelin Guide" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});