import { dataStore } from '../services/dataStore.js';

export const getMenuItems = async (req, res, next) => {
  try {
    const { category, dietary, search, available, published, archived, includeArchived } = req.query;
    const items = await dataStore.getAllMenuItems({
      category,
      dietary,
      search,
      available,
      published,
      archived,
      includeArchived: includeArchived === 'true' || includeArchived === true,
    });
    res.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    next(error);
  }
};

export const getMenuItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await dataStore.getMenuItemById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found.',
      });
    }

    res.json({
      success: true,
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

export const createMenuItem = async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      image,
      available,
      published,
      featured,
      dietary,
      tags,
      pairWith,
      spiciness,
    } = req.body;

    if (!name || !description || price === undefined || !category) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed: name, description, price, and category are required.',
      });
    }

    const numPrice = Number(price);
    if (isNaN(numPrice) || numPrice < 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed: price must be a positive number.',
      });
    }

    const newItem = await dataStore.createMenuItem({
      name: name.trim(),
      description: description.trim(),
      price: numPrice,
      category,
      subCategory: subCategory || '',
      image: image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      available: available !== undefined ? available : true,
      published: published !== undefined ? published : true,
      archived: false,
      featured: featured !== undefined ? featured : false,
      dietary: dietary || 'veg',
      tags: Array.isArray(tags) ? tags : (tags ? [tags] : []),
      pairWith: pairWith || '',
      spiciness: spiciness !== undefined ? Number(spiciness) : 0,
    });

    res.status(201).json({
      success: true,
      message: 'Menu item successfully added to catalog.',
      data: newItem,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await dataStore.updateMenuItem(id, req.body);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found.',
      });
    }

    res.json({
      success: true,
      message: 'Menu item updated successfully.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Archive instead of permanent destruction
    const updated = await dataStore.updateMenuItem(id, { archived: true, published: false });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found.',
      });
    }

    res.json({
      success: true,
      message: 'Menu item archived successfully.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const toggleMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await dataStore.toggleMenuItemAvailability(id);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found.',
      });
    }

    res.json({
      success: true,
      message: `Menu item is now ${updated.available ? 'available' : 'unavailable'}.`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const publishMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await dataStore.updateMenuItem(id, { published: true, archived: false });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Menu item not found.' });
    }

    res.json({
      success: true,
      message: 'Menu item published to live website.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const unpublishMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await dataStore.updateMenuItem(id, { published: false });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Menu item not found.' });
    }

    res.json({
      success: true,
      message: 'Menu item unpublished from live website.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const archiveMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await dataStore.updateMenuItem(id, { archived: true, published: false });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Menu item not found.' });
    }

    res.json({
      success: true,
      message: 'Menu item moved to archive.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const restoreMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await dataStore.updateMenuItem(id, { archived: false, published: true });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Menu item not found.' });
    }

    res.json({
      success: true,
      message: 'Menu item restored and published.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};
