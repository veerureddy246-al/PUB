import { dataStore } from '../services/dataStore.js';

export const subscribeNewsletter = async (req, res, next) => {
  try {
    const { email, source } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed: Email address is required.'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed: Please provide a valid email address.'
      });
    }

    // Check for duplicates
    const existing = await dataStore.findSubscriberByEmail(normalizedEmail);
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'This email is already subscribed to the 1522 Mumbai Insider Society.'
      });
    }

    const subscriber = await dataStore.createSubscriber(normalizedEmail, source || 'website_footer');

    res.status(201).json({
      success: true,
      message: 'Welcome to the 1522 Mumbai Insider Society! You will receive exclusive invitations and seasonal previews.',
      data: {
        email: subscriber.email,
        subscribedAt: subscriber.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getSubscribers = async (req, res, next) => {
  try {
    const subscribers = await dataStore.getAllSubscribers();
    res.json({
      success: true,
      count: subscribers.length,
      data: subscribers
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSubscriber = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await dataStore.deleteSubscriber(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Subscriber not found.'
      });
    }

    res.json({
      success: true,
      message: 'Subscriber removed successfully.'
    });
  } catch (error) {
    next(error);
  }
};
