import express from 'express';
import {
  getOffers,
  getOfferById,
  createOffer,
  updateOffer,
  deleteOffer
} from '../controllers/offerController.js';

const router = express.Router();

router.route('/')
  .get(getOffers)
  .post(createOffer);

router.route('/:id')
  .get(getOfferById)
  .put(updateOffer)
  .delete(deleteOffer);

export default router;
