import express from 'express';
import {
  signUp,
  login,
  getUserById,
  getUsers,
  updateUser,
  verifyEmail,
} from '../Controller/settingAuthController.js';
import { authenticate } from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/signup', signUp);

router.post('/login', login);

router.get('/users', getUsers);

router.get('/users/:id', authenticate, getUserById);

router.put('/users/:id', authenticate, updateUser);

router.get('/verify-email', verifyEmail);

export default router;
