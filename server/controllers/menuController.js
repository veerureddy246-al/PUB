import { dataStore } from '../services/dataStore.js';

export const getMenuItems = async (req, res, next) => {
  try {
    const { category, dietary, search, available } = req.query;
    const items = await dataStore.getAllMenuItems({ category, dietary, search, available });
    res.json({
      success: true,
      count: items.length,
      data: items
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
        message: 'Menu item not found.'
      });
    }

    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    next(error);
  }
};

export const createMenuItem = async (req, res, next) => {
  try {
    const { name, description, price, category, subCategory, image, available, featured, dietary, tags, pairWith } = req.body;

    if (!name || !description || price === undefined || !category) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed: name, description, price, and category are required.'
      });
    }

    const numPrice = Number(price);
    if (isNaN(numPrice) || numPrice < 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed: price must be a positive number.'
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
      featured: featured !== undefined ? featured : false,
      dietary: dietary || 'veg',
      tags: tags || [],
      pairWith: pairWith || ''
    });

    res.status(201).json({
      success: true,
      message: 'Menu item successfully added to catalog.',
      data: newItem
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
        message: 'Menu item not found.'
      });
    }

    res.json({
      success: true,
      message: 'Menu item updated successfully.',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await dataStore.deleteMenuItem(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found or already deleted.'
      });
    }

    res.json({
      success: true,
      message: 'Menu item deleted successfully.'
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
        message: 'Menu item not found.'
      });
    }

    res.json({
      success: true,
      message: `Menu item is now ${updated.available ? 'available' : 'unavailable'}.`,
      data: updated
    });
  } catch (error) {
    next(error);
  }
};
