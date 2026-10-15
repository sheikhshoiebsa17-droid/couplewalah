import { Router } from 'express';
import {
  createRazorpayOrder,
  verifyPayment,
  handleWebhook,
} from '../controllers/paymentController';

const router = Router();

router.post('/create-order', createRazorpayOrder);
router.post('/verify', verifyPayment);
router.post('/webhook', handleWebhook);

export default router;
