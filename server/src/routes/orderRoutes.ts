import { Router } from 'express';
import { createOrder, getMyOrders, getOrderById } from '../controllers/orderController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/', createOrder);
router.get('/my-orders', authenticate, getMyOrders);
router.get('/:id', getOrderById);

export default router;
