import express from 'express';
import {
  subscribeNewsletter,
  getSubscribers,
  deleteSubscriber
} from '../controllers/newsletterController.js';

const router = express.Router();

router.route('/')
  .get(getSubscribers)
  .post(subscribeNewsletter);

router.route('/:id')
  .delete(deleteSubscriber);

export default router;
