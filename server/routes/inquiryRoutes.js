import express from 'express';
import {
  getInquiries,
  createInquiry,
  updateInquiryStatus
} from '../controllers/inquiryController.js';

const router = express.Router();

router.route('/')
  .get(getInquiries)
  .post(createInquiry);

router.patch('/:id/status', updateInquiryStatus);

export default router;
