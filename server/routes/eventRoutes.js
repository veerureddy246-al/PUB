import express from 'express';
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  publishEvent,
  unpublishEvent,
  archiveEvent,
  restoreEvent,
  rsvpEvent,
} from '../controllers/eventController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getEvents)
  .post(protectAdmin, createEvent);

router.route('/:id')
  .get(getEventById)
  .put(protectAdmin, updateEvent)
  .delete(protectAdmin, deleteEvent);

router.route('/:id/publish')
  .patch(protectAdmin, publishEvent);

router.route('/:id/unpublish')
  .patch(protectAdmin, unpublishEvent);

router.route('/:id/archive')
  .patch(protectAdmin, archiveEvent);

router.route('/:id/restore')
  .patch(protectAdmin, restoreEvent);

router.route('/:id/rsvp')
  .post(rsvpEvent);

export default router;
