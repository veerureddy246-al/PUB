import express from 'express';
import {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleMenuItem
} from '../controllers/menuController.js';

const router = express.Router();

router.route('/')
  .get(getMenuItems)
  .post(createMenuItem);

router.route('/:id')
  .get(getMenuItemById)
  .put(updateMenuItem)
  .delete(deleteMenuItem);

router.route('/:id/toggle')
  .patch(toggleMenuItem);

export default router;
