import express from 'express';
import {
  getOffers,
  getOfferById,
  createOffer,
  updateOffer,
  deleteOffer,
  publishOffer,
  unpublishOffer,
  archiveOffer,
  restoreOffer,
} from '../controllers/offerController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getOffers)
  .post(protectAdmin, createOffer);

router.route('/:id')
  .get(getOfferById)
  .put(protectAdmin, updateOffer)
  .delete(protectAdmin, deleteOffer);

router.route('/:id/publish')
  .patch(protectAdmin, publishOffer);

router.route('/:id/unpublish')
  .patch(protectAdmin, unpublishOffer);

router.route('/:id/archive')
  .patch(protectAdmin, archiveOffer);

router.route('/:id/restore')
  .patch(protectAdmin, restoreOffer);

export default router;
