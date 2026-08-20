import express from 'express';
import {
  getGalleryItems,
  getGalleryItemById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  publishGalleryItem,
  unpublishGalleryItem,
  archiveGalleryItem,
  restoreGalleryItem,
} from '../controllers/galleryController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getGalleryItems)
  .post(protectAdmin, createGalleryItem);

router.route('/:id')
  .get(getGalleryItemById)
  .put(protectAdmin, updateGalleryItem)
  .delete(protectAdmin, deleteGalleryItem);

router.route('/:id/publish')
  .patch(protectAdmin, publishGalleryItem);

router.route('/:id/unpublish')
  .patch(protectAdmin, unpublishGalleryItem);

router.route('/:id/archive')
  .patch(protectAdmin, archiveGalleryItem);

router.route('/:id/restore')
  .patch(protectAdmin, restoreGalleryItem);

export default router;
