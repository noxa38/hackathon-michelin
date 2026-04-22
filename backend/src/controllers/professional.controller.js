import User from "../models/user.model.js";
import db from "../config/db.js";

/**
 * Create a professional request
 * POST /api/professional/request
 */
export const createProfessionalRequest = async (req, res) => {
  try {
    const { restaurantId, proofDocumentUrl } = req.body;
    const userId = req.user.id;

    if (!restaurantId || !proofDocumentUrl) {
      return res.status(400).json({ message: "restaurantId and proofDocumentUrl are required" });
    }

    // Check if user already has a pending or approved request for this restaurant
    const existingRequest = await User.getProfessionalRequest(userId, restaurantId);
    if (existingRequest) {
      return res.status(400).json({ message: "You already have a request for this restaurant" });
    }

    // Check if user is already a professional for this restaurant
    const professionalRestaurant = await User.getProfessionalRestaurant(userId, restaurantId);
    if (professionalRestaurant) {
      return res.status(400).json({ message: "You are already managing this restaurant" });
    }

    const result = await User.createProfessionalRequest(userId, restaurantId, proofDocumentUrl);
    res.status(201).json({ 
      message: "Professional request created successfully", 
      requestId: result.insertId 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create professional request", error: err.message });
  }
};

/**
 * Get professional requests (admin only)
 * GET /api/admin/professional-requests
 */
export const getProfessionalRequests = async (req, res) => {
  try {
    const requests = await User.getPendingProfessionalRequests();
    res.status(200).json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch professional requests", error: err.message });
  }
};

/**
 * Approve professional request (admin only)
 * POST /api/admin/professional-requests/:id/approve
 */
export const approveProfessionalRequest = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Request ID is required" });
    }

    await User.approveProfessionalRequest(id);
    res.status(200).json({ message: "Professional request approved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to approve professional request", error: err.message });
  }
};

/**
 * Reject professional request (admin only)
 * POST /api/admin/professional-requests/:id/reject
 */
export const rejectProfessionalRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { rejectionReason } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Request ID is required" });
    }

    if (!rejectionReason) {
      return res.status(400).json({ message: "Rejection reason is required" });
    }

    await User.rejectProfessionalRequest(id, rejectionReason);
    res.status(200).json({ message: "Professional request rejected successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to reject professional request", error: err.message });
  }
};

/**
 * Get admin statistics
 * GET /api/admin/statistics
 */
export const getStatistics = async (req, res) => {
  try {
    const stats = await User.getStatistics();
    res.status(200).json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch statistics", error: err.message });
  }
};

/**
 * Create admin user (admin only)
 * POST /api/admin/create-admin
 */
export const createAdminUser = async (req, res) => {
  try {
    const { email, username, password, firstName, lastName } = req.body;

    if (!email || !username || !password || !firstName || !lastName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const existingUsername = await User.findByUsername(username);
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const hashedPassword = await User.hashPassword(password);
    const result = await User.createAdmin(email, username, hashedPassword, firstName, lastName);

    res.status(201).json({ 
      message: "Admin user created successfully", 
      userId: result.insertId 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create admin user", error: err.message });
  }
};

/**
 * Get professional's restaurants
 * GET /api/professional/restaurants
 */
export const getProfessionalRestaurants = async (req, res) => {
  try {
    const userId = req.user.id;
    const restaurants = await User.getProfessionalRestaurants(userId);
    res.status(200).json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch restaurants", error: err.message });
  }
};

/**
 * Update professional restaurant details
 * PUT /api/professional/restaurants/:restaurantId
 */
export const updateProfessionalRestaurant = async (req, res) => {
  try {
    const userId = req.user.id;
    const { restaurantId } = req.params;
    const { hours, menu, description, prices, photos } = req.body;

    if (!restaurantId) {
      return res.status(400).json({ message: "Restaurant ID is required" });
    }

    // Check if professional owns this restaurant
    const restaurant = await User.getProfessionalRestaurant(userId, restaurantId);
    if (!restaurant) {
      return res.status(403).json({ message: "You don't have permission to edit this restaurant" });
    }

    const updateData = {};
    if (hours) updateData.hours = hours;
    if (menu) updateData.menu = menu;
    if (description) updateData.description = description;
    if (prices) updateData.prices = prices;
    if (photos) updateData.photos = photos;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "At least one field must be provided" });
    }

    await User.updateProfessionalRestaurant(userId, restaurantId, updateData);
    res.status(200).json({ message: "Restaurant details updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update restaurant", error: err.message });
  }
};
