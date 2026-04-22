import List from "../models/list.model.js";

export async function getLists(req, res) {
  try {
    const userId = req.user.id;
    const lists = await List.findByUserId(userId);

    return res.json(lists);
  } catch (error) {
    console.error("Get lists error:", error);
    res.status(500).json({ error: "Erreur lors de la récupération des listes" });
  }
}

export async function getList(req, res) {
  try {
    const userId = req.user.id;
    const listId = req.params.id;

    const list = await List.findById(listId, userId);
    if (!list) {
      return res.status(404).json({ error: "Liste non trouvée" });
    }

    return res.json(list);
  } catch (error) {
    console.error("Get list error:", error);
    res.status(500).json({ error: "Erreur lors de la récupération de la liste" });
  }
}

export async function createList(req, res) {
  try {
    const userId = req.user.id;
    const { name, description = "", icon = "bookmark", color = "#e63946" } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Le nom de la liste est requis" });
    }

    const result = await List.create(userId, name, description, icon, color);
    const list = await List.findById(result.insertId, userId);

    return res.status(201).json(list);
  } catch (error) {
    console.error("Create list error:", error);
    res.status(500).json({ error: "Erreur lors de la création de la liste" });
  }
}

export async function updateList(req, res) {
  try {
    const userId = req.user.id;
    const listId = req.params.id;
    const { name, description, icon, color, isPublic } = req.body;

    const existingList = await List.findById(listId, userId);
    if (!existingList) {
      return res.status(404).json({ error: "Liste non trouvée" });
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (icon !== undefined) updateData.icon = icon;
    if (color !== undefined) updateData.color = color;
    if (isPublic !== undefined) updateData.is_public = isPublic;

    await List.update(listId, userId, updateData);
    const updatedList = await List.findById(listId, userId);

    return res.json(updatedList);
  } catch (error) {
    console.error("Update list error:", error);
    res.status(500).json({ error: "Erreur lors de la mise à jour de la liste" });
  }
}

export async function deleteList(req, res) {
  try {
    const userId = req.user.id;
    const listId = req.params.id;

    const existingList = await List.findById(listId, userId);
    if (!existingList) {
      return res.status(404).json({ error: "Liste non trouvée" });
    }

    await List.delete(listId, userId);

    return res.json({ message: "Liste supprimée avec succès" });
  } catch (error) {
    console.error("Delete list error:", error);
    res.status(500).json({ error: "Erreur lors de la suppression de la liste" });
  }
}

export async function addRestaurant(req, res) {
  try {
    const userId = req.user.id;
    const listId = req.params.listId;
    const { restaurantId } = req.body;

    if (!restaurantId) {
      return res.status(400).json({ error: "ID du restaurant requis" });
    }

    await List.addRestaurant(listId, restaurantId, userId);
    const list = await List.findById(listId, userId);

    return res.json(list);
  } catch (error) {
    console.error("Add restaurant error:", error);
    res.status(500).json({ error: "Erreur lors de l'ajout du restaurant" });
  }
}

export async function removeRestaurant(req, res) {
  try {
    const userId = req.user.id;
    const listId = req.params.listId;
    const restaurantId = req.params.restaurantId;

    await List.removeRestaurant(listId, restaurantId, userId);
    const list = await List.findById(listId, userId);

    return res.json(list);
  } catch (error) {
    console.error("Remove restaurant error:", error);
    res.status(500).json({ error: "Erreur lors de la suppression du restaurant" });
  }
}

export async function getListRestaurants(req, res) {
  try {
    const userId = req.user.id;
    const listId = req.params.listId;

    const restaurants = await List.getRestaurants(listId, userId);

    return res.json(restaurants);
  } catch (error) {
    console.error("Get list restaurants error:", error);
    res.status(500).json({ error: "Erreur lors de la récupération des restaurants" });
  }
}
