import express from 'express';
import {
  getContactMessages,
  getContactMessageById,
  createContactMessage,
  updateContactMessageStatus,
  deleteContactMessage
} from '../controllers/contactController.js';

const router = express.Router();

router.route('/')
  .get(getContactMessages)
  .post(createContactMessage);

router.route('/:id')
  .get(getContactMessageById)
  .delete(deleteContactMessage);

router.route('/:id/status')
  .patch(updateContactMessageStatus);

export default router;
