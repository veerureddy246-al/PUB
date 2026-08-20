import { dataStore } from '../services/dataStore.js';

export const getEvents = async (req, res, next) => {
  try {
    const { includeInactive, published, archived, includeArchived } = req.query;
    const events = await dataStore.getAllEvents({
      includeInactive: includeInactive === 'true' || includeInactive === true,
      published,
      archived,
      includeArchived: includeArchived === 'true' || includeArchived === true,
    });
    res.json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    next(error);
  }
};

export const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await dataStore.getEventById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found.',
      });
    }

    res.json({
      success: true,
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

export const createEvent = async (req, res, next) => {
  try {
    const {
      title,
      subtitle,
      description,
      date,
      time,
      timing,
      day,
      image,
      category,
      genre,
      artist,
      deck,
      coverCharge,
      featured,
      active,
      published,
    } = req.body;

    if (!title || !description || !date || (!time && !timing) || !image) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed: title, description, date, time, and image are required.',
      });
    }

    const newEvent = await dataStore.createEvent({
      title: title.trim(),
      subtitle: subtitle || '',
      description: description.trim(),
      date,
      time: time || timing,
      timing: timing || time,
      day: day || '',
      image,
      category: category || genre || 'Live Music',
      genre: genre || category || 'Live Acoustic & Indie',
      artist: artist || 'Resident Artists',
      deck: deck || 'Upper Sky Deck (Open Air)',
      coverCharge: coverCharge || 'Free Entry • Prior Table Reservation Recommended',
      featured: featured !== undefined ? featured : false,
      active: active !== undefined ? active : true,
      published: published !== undefined ? published : true,
      archived: false,
    });

    res.status(201).json({
      success: true,
      message: 'Event scheduled successfully.',
      data: newEvent,
    });
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await dataStore.updateEvent(id, req.body);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Event not found.',
      });
    }

    res.json({
      success: true,
      message: 'Event updated successfully.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await dataStore.updateEvent(id, { archived: true, published: false, active: false });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Event not found or already deleted.',
      });
    }

    res.json({
      success: true,
      message: 'Event archived successfully.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const publishEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await dataStore.updateEvent(id, { published: true, active: true, archived: false });

    if (!updated) return res.status(404).json({ success: false, message: 'Event not found.' });

    res.json({
      success: true,
      message: 'Event published to live website.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const unpublishEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await dataStore.updateEvent(id, { published: false, active: false });

    if (!updated) return res.status(404).json({ success: false, message: 'Event not found.' });

    res.json({
      success: true,
      message: 'Event unpublished from live website.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const archiveEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await dataStore.updateEvent(id, { archived: true, published: false, active: false });

    if (!updated) return res.status(404).json({ success: false, message: 'Event not found.' });

    res.json({
      success: true,
      message: 'Event moved to archive.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const restoreEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await dataStore.updateEvent(id, { archived: false, published: true, active: true });

    if (!updated) return res.status(404).json({ success: false, message: 'Event not found.' });

    res.json({
      success: true,
      message: 'Event restored and published.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const rsvpEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await dataStore.rsvpEvent(id);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Event not found.',
      });
    }

    res.json({
      success: true,
      message: 'RSVP confirmed! We look forward to seeing you at 1522 Mumbai.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};
