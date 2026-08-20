import express from 'express';
import {
  getReservations,
  getReservationById,
  createReservation,
  updateReservation,
  updateReservationStatus,
  deleteReservation
} from '../controllers/reservationController.js';

const router = express.Router();

router.route('/')
  .get(getReservations)
  .post(createReservation);

router.route('/:id')
  .get(getReservationById)
  .put(updateReservation)
  .delete(deleteReservation);

router.route('/:id/status')
  .patch(updateReservationStatus);

export default router;
