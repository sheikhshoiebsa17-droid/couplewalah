import { Router } from 'express';
import {
  getDashboardStats,
  getAdminOrders,
  updateOrderStatus,
  createProduct,
  updateProduct,
} from '../controllers/adminController';
import { authenticate, requireAdmin } from '../middleware/authMiddleware';

const router = Router();

// Protect all admin endpoints
router.use(authenticate, requireAdmin);

router.get('/dashboard', getDashboardStats);
router.get('/orders', getAdminOrders);
router.patch('/orders/:id/status', updateOrderStatus);
router.post('/products', createProduct);
router.patch('/products/:id', updateProduct);

export default router;
