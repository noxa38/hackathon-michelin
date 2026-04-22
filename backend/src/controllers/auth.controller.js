import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export async function register(req, res) {
  try {
    const { email, username, password, passwordConfirm, firstName, lastName } = req.body;

    // Validation
    if (!email || !username || !password || !passwordConfirm || !firstName || !lastName) {
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({ error: "Les mots de passe ne correspondent pas" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Le mot de passe doit contenir au moins 6 caractères" });
    }

    // Vérifier si l'email existe déjà
    const existingEmail = await User.findByEmail(email);
    if (existingEmail) {
      return res.status(409).json({ error: "Email déjà utilisé" });
    }

    // Vérifier si l'username existe déjà
    const existingUsername = await User.findByUsername(username);
    if (existingUsername) {
      return res.status(409).json({ error: "Nom d'utilisateur déjà utilisé" });
    }

    // Hasher le mot de passe
    const hashedPassword = await User.hashPassword(password);

    // Créer l'utilisateur
    const result = await User.create(email, username, hashedPassword, firstName, lastName);

    // Récupérer l'utilisateur créé
    const user = await User.findById(result.insertId);

    // Générer un token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, userType: user.user_type },
      SECRET_KEY,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
        userType: user.user_type,
        createdAt: user.created_at,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Erreur lors de l'inscription" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email et mot de passe requis" });
    }

    // Trouver l'utilisateur
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await User.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, userType: user.user_type },
      SECRET_KEY,
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
        userType: user.user_type,
        createdAt: user.created_at,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Erreur lors de la connexion" });
  }
}

export async function getProfile(req, res) {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    return res.json({
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      userType: user.user_type,
      avatarUrl: user.avatar_url,
      bio: user.bio,
      createdAt: user.created_at,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ error: "Erreur lors de la récupération du profil" });
  }
}

export async function updateProfile(req, res) {
  try {
    const userId = req.user.id;
    const { firstName, lastName, bio, avatarUrl } = req.body;

    const updateData = {};
    if (firstName !== undefined) updateData.first_name = firstName;
    if (lastName !== undefined) updateData.last_name = lastName;
    if (bio !== undefined) updateData.bio = bio;
    if (avatarUrl !== undefined) updateData.avatar_url = avatarUrl;

    await User.update(userId, updateData);
    const updatedUser = await User.findById(userId);

    return res.json({
      id: updatedUser.id,
      email: updatedUser.email,
      username: updatedUser.username,
      firstName: updatedUser.first_name,
      lastName: updatedUser.last_name,
      userType: updatedUser.user_type,
      avatarUrl: updatedUser.avatar_url,
      bio: updatedUser.bio,
      createdAt: updatedUser.created_at,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ error: "Erreur lors de la mise à jour du profil" });
  }
}

export async function verifyToken(req, res) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token manquant" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    return res.json({
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      userType: user.user_type,
      createdAt: user.created_at,
    });
  } catch (error) {
    res.status(401).json({ error: "Token invalide" });
  }
}
