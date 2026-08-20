import { dataStore } from '../services/dataStore.js';

export const getOffers = async (req, res, next) => {
  try {
    const { includeExpired, published, archived, includeArchived } = req.query;
    const offers = await dataStore.getAllOffers({
      includeExpired: includeExpired === 'true' || includeExpired === true,
      published,
      archived,
      includeArchived: includeArchived === 'true' || includeArchived === true,
    });
    res.json({
      success: true,
      count: offers.length,
      data: offers,
    });
  } catch (error) {
    next(error);
  }
};

export const getOfferById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const offer = await dataStore.getOfferById(id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: 'Offer not found.',
      });
    }

    res.json({
      success: true,
      data: offer,
    });
  } catch (error) {
    next(error);
  }
};

export const createOffer = async (req, res, next) => {
  try {
    const { title, subtitle, description, image, startDate, endDate, active, badge, timing, terms, published } = req.body;

    if (!title || !description || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed: title, description, and endDate are required.',
      });
    }

    const end = new Date(endDate);
    if (isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed: invalid endDate format.',
      });
    }

    const newOffer = await dataStore.createOffer({
      title: title.trim(),
      subtitle: subtitle || '',
      description: description.trim(),
      image: image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      startDate: startDate ? new Date(startDate) : new Date(),
      endDate: end,
      active: active !== undefined ? active : true,
      published: published !== undefined ? published : true,
      archived: false,
      badge: badge || 'Special Offer',
      timing: timing || '',
      terms: terms || '',
    });

    res.status(201).json({
      success: true,
      message: 'Offer created successfully.',
      data: newOffer,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOffer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await dataStore.updateOffer(id, req.body);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Offer not found.',
      });
    }

    res.json({
      success: true,
      message: 'Offer updated successfully.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOffer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await dataStore.updateOffer(id, { archived: true, published: false, active: false });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Offer not found or already removed.',
      });
    }

    res.json({
      success: true,
      message: 'Offer archived successfully.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const publishOffer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await dataStore.updateOffer(id, { published: true, active: true, archived: false });

    if (!updated) return res.status(404).json({ success: false, message: 'Offer not found.' });

    res.json({
      success: true,
      message: 'Offer published to live website.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const unpublishOffer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await dataStore.updateOffer(id, { published: false, active: false });

    if (!updated) return res.status(404).json({ success: false, message: 'Offer not found.' });

    res.json({
      success: true,
      message: 'Offer unpublished from live website.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const archiveOffer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await dataStore.updateOffer(id, { archived: true, published: false, active: false });

    if (!updated) return res.status(404).json({ success: false, message: 'Offer not found.' });

    res.json({
      success: true,
      message: 'Offer moved to archive.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const restoreOffer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await dataStore.updateOffer(id, { archived: false, published: true, active: true });

    if (!updated) return res.status(404).json({ success: false, message: 'Offer not found.' });

    res.json({
      success: true,
      message: 'Offer restored and published.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};
