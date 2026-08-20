import express from 'express';
import {
  getSettings,
  updateSettings,
  getHero,
  updateHero,
  getStory,
  updateStory,
  getContact,
  updateContact,
} from '../controllers/settingsController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getSettings)
  .put(protectAdmin, updateSettings);

router.route('/hero')
  .get(getHero)
  .put(protectAdmin, updateHero);

router.route('/story')
  .get(getStory)
  .put(protectAdmin, updateStory);

router.route('/contact')
  .get(getContact)
  .put(protectAdmin, updateContact);

export default router;
