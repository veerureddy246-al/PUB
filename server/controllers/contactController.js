import { dataStore } from '../services/dataStore.js';

export const getContactMessages = async (req, res, next) => {
  try {
    const { status } = req.query;
    const messages = await dataStore.getAllContactMessages(status);
    res.json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    next(error);
  }
};

export const getContactMessageById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await dataStore.getContactMessageById(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found.'
      });
    }

    res.json({
      success: true,
      data: message
    });
  } catch (error) {
    next(error);
  }
};

export const createContactMessage = async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;

    const nameVal = (name || '').trim();
    const emailVal = (email || '').trim().toLowerCase();
    const phoneVal = (phone || '').trim();
    const messageVal = (message || '').trim();

    const errors = [];
    if (!nameVal) errors.push('Name is required.');
    if (!emailVal) errors.push('Email is required.');
    if (!phoneVal) errors.push('Phone number is required.');
    if (!messageVal) errors.push('Message content is required.');

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed: Please fill in all required fields.',
        errors
      });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailVal)) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed: Please enter a valid email address.',
        errors: ['Invalid email format.']
      });
    }

    if (messageVal.length < 5) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed: Message must be at least 5 characters long.',
        errors: ['Message too short.']
      });
    }

    const saved = await dataStore.createContactMessage({
      name: nameVal,
      email: emailVal,
      phone: phoneVal,
      message: messageVal,
      status: 'unread'
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! The 1522 Mumbai hospitality desk has received your message and will respond promptly.',
      data: saved
    });
  } catch (error) {
    next(error);
  }
};

export const updateContactMessageStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['unread', 'read', 'replied', 'archived'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Allowed: unread, read, replied, archived.'
      });
    }

    const updated = await dataStore.updateContactMessageStatus(id, status);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Message not found.'
      });
    }

    res.json({
      success: true,
      message: 'Message status updated.',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await dataStore.deleteContactMessage(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Message not found.'
      });
    }

    res.json({
      success: true,
      message: 'Message deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};
