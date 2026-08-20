import express from 'express';
import {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleMenuItem,
  publishMenuItem,
  unpublishMenuItem,
  archiveMenuItem,
  restoreMenuItem,
} from '../controllers/menuController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getMenuItems)
  .post(protectAdmin, createMenuItem);

router.route('/:id')
  .get(getMenuItemById)
  .put(protectAdmin, updateMenuItem)
  .delete(protectAdmin, deleteMenuItem);

router.route('/:id/toggle')
  .patch(protectAdmin, toggleMenuItem);

router.route('/:id/publish')
  .patch(protectAdmin, publishMenuItem);

router.route('/:id/unpublish')
  .patch(protectAdmin, unpublishMenuItem);

router.route('/:id/archive')
  .patch(protectAdmin, archiveMenuItem);

router.route('/:id/restore')
  .patch(protectAdmin, restoreMenuItem);

export default router;
