import express from 'express';
import AiController from '../controllers/aiController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

// router.post('/calculateCost', auth.verifyToken, AiController.calculateCost);
router.post('/callAgent', AiController.callAI);

export default router;
