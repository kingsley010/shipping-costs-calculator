import express from 'express';
import ShippingController from '../controllers/shippingController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

// router.post('/calculateCost', auth.verifyToken, ShippingController.calculateCost);
router.post('/calculateCost', ShippingController.calculateCost);

export default router;
