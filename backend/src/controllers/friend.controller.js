import Friend from "../models/friend.model.js";

export async function searchUsers(req, res) {
  try {
    const userId = req.user.id;
    const query = String(req.query.q || "").trim();

    if (!query) {
      return res.json([]);
    }

    const users = await Friend.searchUsers(userId, query);
    return res.json(
      users.map((user) => ({
        id: user.id,
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
        userType: user.user_type,
        createdAt: user.created_at,
        isFriend: Boolean(user.is_friend),
      }))
    );
  } catch (error) {
    console.error("Search users error:", error);
    res.status(500).json({ error: "Erreur lors de la recherche des utilisateurs" });
  }
}

export async function addFriend(req, res) {
  try {
    const userId = req.user.id;
    const friendId = Number(req.body.friendId);

    if (!Number.isFinite(friendId)) {
      return res.status(400).json({ error: "ID ami invalide" });
    }

    if (friendId === userId) {
      return res.status(400).json({ error: "Vous ne pouvez pas vous ajouter vous-même" });
    }

    await Friend.addFriend(userId, friendId);
    return res.json({ message: "Ami ajouté" });
  } catch (error) {
    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }
    if (error.message === "INVALID_FRIEND") {
      return res.status(400).json({ error: "Utilisateur non éligible" });
    }

    console.error("Add friend error:", error);
    res.status(500).json({ error: "Erreur lors de l'ajout de l'ami" });
  }
}

export async function getFriends(req, res) {
  try {
    const userId = req.user.id;
    const friends = await Friend.getFriends(userId);

    return res.json(
      friends.map((friend) => ({
        id: friend.id,
        username: friend.username,
        firstName: friend.first_name,
        lastName: friend.last_name,
        userType: friend.user_type,
        createdAt: friend.created_at,
        friendSince: friend.friend_since,
        stats: {
          likedRestaurants: Number(friend.liked_restaurants || 0),
          likedAccommodations: Number(friend.liked_accommodations || 0),
        },
      }))
    );
  } catch (error) {
    console.error("Get friends error:", error);
    res.status(500).json({ error: "Erreur lors de la récupération des amis" });
  }
}

export async function getFriendProfile(req, res) {
  try {
    const userId = req.user.id;
    const friendId = Number(req.params.friendId);

    if (!Number.isFinite(friendId)) {
      return res.status(400).json({ error: "ID ami invalide" });
    }

    const profile = await Friend.getFriendPublicProfile(userId, friendId);
    if (!profile) {
      return res.status(404).json({ error: "Profil ami introuvable" });
    }

    return res.json({
      user: {
        id: profile.user.id,
        username: profile.user.username,
        firstName: profile.user.first_name,
        lastName: profile.user.last_name,
        userType: profile.user.user_type,
        createdAt: profile.user.created_at,
      },
      stats: {
        likedRestaurants: Number(profile.stats.liked_restaurants || 0),
        likedAccommodations: Number(profile.stats.liked_accommodations || 0),
      },
      favoriteRestaurants: profile.favoriteRestaurants,
      favoriteAccommodations: profile.favoriteAccommodations,
    });
  } catch (error) {
    console.error("Get friend profile error:", error);
    res.status(500).json({ error: "Erreur lors de la récupération du profil ami" });
  }
}
