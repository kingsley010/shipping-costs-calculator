import express from 'express';
import UserController from '../controllers/userController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

const usercontroller = new UserController();

router.get('/all', usercontroller.homePage);
router.get('/user', auth.verifyToken, usercontroller.userPage);
router.post('/signup', usercontroller.register);
router.post('/signin', usercontroller.login);

export default router;


