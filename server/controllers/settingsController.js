import { dataStore } from '../services/dataStore.js';

export const getSettings = async (req, res, next) => {
  try {
    const settings = await dataStore.getSettings();
    res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    const updated = await dataStore.updateSettings(req.body);
    res.json({
      success: true,
      message: 'Website settings updated successfully.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const getHero = async (req, res, next) => {
  try {
    const settings = await dataStore.getSettings();
    res.json({
      success: true,
      data: settings.hero,
    });
  } catch (error) {
    next(error);
  }
};

export const updateHero = async (req, res, next) => {
  try {
    const settings = await dataStore.getSettings();
    const updatedHero = { ...settings.hero, ...req.body };
    const updated = await dataStore.updateSettings({ hero: updatedHero });
    res.json({
      success: true,
      message: 'Hero section content updated successfully.',
      data: updated.hero,
    });
  } catch (error) {
    next(error);
  }
};

export const getStory = async (req, res, next) => {
  try {
    const settings = await dataStore.getSettings();
    res.json({
      success: true,
      data: settings.story,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStory = async (req, res, next) => {
  try {
    const settings = await dataStore.getSettings();
    const updatedStory = { ...settings.story, ...req.body };
    const updated = await dataStore.updateSettings({ story: updatedStory });
    res.json({
      success: true,
      message: 'Our Story content updated successfully.',
      data: updated.story,
    });
  } catch (error) {
    next(error);
  }
};

export const getContact = async (req, res, next) => {
  try {
    const settings = await dataStore.getSettings();
    res.json({
      success: true,
      data: {
        restaurantName: settings.restaurantName,
        address: settings.address,
        phone: settings.phone,
        secondaryPhone: settings.secondaryPhone,
        email: settings.email,
        googleMapsUrl: settings.googleMapsUrl,
        openingHours: settings.openingHours,
        socialLinks: settings.socialLinks,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const updated = await dataStore.updateSettings(req.body);
    res.json({
      success: true,
      message: 'Contact & opening hours updated successfully.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};
