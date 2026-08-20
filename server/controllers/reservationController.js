import { dataStore } from '../services/dataStore.js';

export const getReservations = async (req, res, next) => {
  try {
    const { status, date } = req.query;
    const reservations = await dataStore.getAllReservations({ status, date });
    res.json({
      success: true,
      count: reservations.length,
      data: reservations
    });
  } catch (error) {
    next(error);
  }
};

export const getReservationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reservation = await dataStore.getReservationById(id) || await dataStore.getReservationByReference(id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: `Reservation not found with identifier "${id}".`
      });
    }

    res.json({
      success: true,
      data: reservation
    });
  } catch (error) {
    next(error);
  }
};

export const createReservation = async (req, res, next) => {
  try {
    const {
      name,
      guestName,
      email,
      phone,
      date,
      time,
      timeSlot,
      guests,
      partySize,
      deckZone,
      occasion,
      specialRequest,
      specialRequests
    } = req.body;

    const guestNameVal = (name || guestName || '').trim();
    const emailVal = (email || '').trim().toLowerCase();
    const phoneVal = (phone || '').trim();
    const dateVal = (date || '').trim();
    const timeVal = (time || timeSlot || '').trim();
    const guestsVal = Number(guests || partySize);

    // 1. Required fields check
    const errors = [];
    if (!guestNameVal) errors.push('Guest name is required.');
    if (!emailVal) errors.push('Email address is required.');
    if (!phoneVal) errors.push('Phone number is required.');
    if (!dateVal) errors.push('Reservation date is required.');
    if (!timeVal) errors.push('Arrival time is required.');
    if (!guestsVal || isNaN(guestsVal)) errors.push('Guest count is required.');

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed: Missing mandatory reservation details.',
        errors
      });
    }

    // 2. Email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailVal)) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed: Please enter a valid email address.',
        errors: ['Invalid email format.']
      });
    }

    // 3. Phone format validation
    const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$|^[0-9+()\-.\s]{7,20}$/;
    if (!phoneRegex.test(phoneVal)) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed: Please enter a valid 10-digit phone number or international contact format.',
        errors: ['Invalid phone number format.']
      });
    }

    // 4. Guest count validation
    if (guestsVal < 1 || guestsVal > 50) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed: Online table bookings accommodate between 1 and 50 guests.',
        errors: ['Guest count must be between 1 and 50.']
      });
    }

    // 5. Date validation & Past Date check
    const bookingDate = new Date(dateVal);
    if (isNaN(bookingDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed: Invalid reservation date format (expected YYYY-MM-DD).',
        errors: ['Invalid date format.']
      });
    }

    // Check if the date is in the past (allow today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(dateVal + 'T00:00:00');
    if (checkDate < today) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed: Reservation date cannot be in the past.',
        errors: ['Cannot book tables for past dates.']
      });
    }

    // 6. Create reservation in persistent repository
    const reservation = await dataStore.createReservation({
      name: guestNameVal,
      guestName: guestNameVal,
      email: emailVal,
      phone: phoneVal,
      date: dateVal,
      time: timeVal,
      timeSlot: timeVal,
      guests: guestsVal,
      partySize: guestsVal,
      deckZone: deckZone || 'sky-deck',
      occasion: occasion || 'casual',
      specialRequest: specialRequest || specialRequests || '',
      specialRequests: specialRequest || specialRequests || ''
    });

    res.status(201).json({
      success: true,
      message: 'Table reservation successfully confirmed at 1522 Bar & Kitchen Mumbai.',
      data: reservation
    });
  } catch (error) {
    next(error);
  }
};

export const updateReservation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await dataStore.updateReservation(id, req.body);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found.'
      });
    }

    res.json({
      success: true,
      message: 'Reservation successfully updated.',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

export const updateReservationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = ['pending', 'confirmed', 'seated', 'completed', 'cancelled'];
    if (!allowed.includes(status?.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid reservation status. Allowed: pending, confirmed, seated, completed, cancelled.'
      });
    }

    const updated = await dataStore.updateReservationStatus(id, status.toLowerCase());
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Reservation not found.' });
    }

    res.json({
      success: true,
      message: `Reservation status updated to "${status}".`,
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

export const deleteReservation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await dataStore.updateReservation(id, { archived: true });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found or already removed.'
      });
    }

    res.json({
      success: true,
      message: 'Reservation archived successfully.',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};
