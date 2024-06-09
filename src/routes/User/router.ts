import UserController from '@/controllers/User/controller';

import express from 'express';
const router = express.Router();

//POSTs
  router.post('/login', UserController.validateUser);
  router.post('/register/candidato', () => {})

export default router;  