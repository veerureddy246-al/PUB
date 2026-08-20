import { dataStore } from '../services/dataStore.js';

export const getGalleryItems = async (req, res, next) => {
  try {
    const { category, published, archived, includeArchived } = req.query;
    const items = await dataStore.getAllGalleryItems({
      category,
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

export const getGalleryItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await dataStore.getGalleryItemById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found.',
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

export const createGalleryItem = async (req, res, next) => {
  try {
    const { image, url, title, caption, category, alt, featured, order, published } = req.body;

    const imgUrl = image || url;
    const itemTitle = title || caption;

    if (!imgUrl || !itemTitle) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed: image URL and title are required.',
      });
    }

    const newItem = await dataStore.createGalleryItem({
      image: imgUrl,
      url: imgUrl,
      title: itemTitle.trim(),
      caption: itemTitle.trim(),
      category: category || 'Ambience',
      alt: alt || itemTitle.trim(),
      featured: featured !== undefined ? featured : false,
      published: published !== undefined ? published : true,
      archived: false,
      order: order !== undefined ? Number(order) : 0,
    });

    res.status(201).json({
      success: true,
      message: 'Gallery photograph added successfully.',
      data: newItem,
    });
  } catch (error) {
    next(error);
  }
};

export const updateGalleryItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await dataStore.updateGalleryItem(id, req.body);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found.',
      });
    }

    res.json({
      success: true,
      message: 'Gallery item updated successfully.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteGalleryItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await dataStore.updateGalleryItem(id, { archived: true, published: false });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found or already deleted.',
      });
    }

    res.json({
      success: true,
      message: 'Gallery item archived successfully.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const publishGalleryItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await dataStore.updateGalleryItem(id, { published: true, archived: false });

    if (!updated) return res.status(404).json({ success: false, message: 'Gallery item not found.' });

    res.json({
      success: true,
      message: 'Gallery item published to live website.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const unpublishGalleryItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await dataStore.updateGalleryItem(id, { published: false });

    if (!updated) return res.status(404).json({ success: false, message: 'Gallery item not found.' });

    res.json({
      success: true,
      message: 'Gallery item unpublished from live website.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const archiveGalleryItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await dataStore.updateGalleryItem(id, { archived: true, published: false });

    if (!updated) return res.status(404).json({ success: false, message: 'Gallery item not found.' });

    res.json({
      success: true,
      message: 'Gallery item moved to archive.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const restoreGalleryItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await dataStore.updateGalleryItem(id, { archived: false, published: true });

    if (!updated) return res.status(404).json({ success: false, message: 'Gallery item not found.' });

    res.json({
      success: true,
      message: 'Gallery item restored and published.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};
