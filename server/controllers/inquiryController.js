import { dataStore } from '../services/dataStore.js';

export const getInquiries = async (req, res, next) => {
  try {
    const inquiries = await dataStore.getAllInquiries();
    res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error) {
    next(error);
  }
};

export const createInquiry = async (req, res, next) => {
  try {
    const {
      eventType,
      organizerName,
      email,
      phone,
      companyName,
      estimatedGuests,
      targetDate,
      deckPreference,
      cateringPackage,
      additionalNotes
    } = req.body;

    if (!eventType || !organizerName || !email || !phone || !estimatedGuests || !targetDate) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required fields for your event inquiry.'
      });
    }

    const inquiry = await dataStore.createInquiry({
      eventType,
      organizerName,
      email,
      phone,
      companyName: companyName || '',
      estimatedGuests: Number(estimatedGuests),
      targetDate,
      deckPreference: deckPreference || 'Any / Full Rooftop Buyout',
      cateringPackage: cateringPackage || 'signature-cocktail-tapas',
      additionalNotes: additionalNotes || ''
    });

    res.status(201).json({
      success: true,
      message: 'Your private dining & event inquiry has been submitted. Our hospitality curator will reach out within 2 business hours.',
      data: inquiry
    });
  } catch (error) {
    next(error);
  }
};

export const updateInquiryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await dataStore.updateInquiryStatus(id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Inquiry not found.' });
    }

    res.json({ success: true, message: 'Inquiry status updated.', data: updated });
  } catch (error) {
    next(error);
  }
};
