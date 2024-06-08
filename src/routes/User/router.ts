import UserController from '@/controllers/User/controller';

import express from 'express';
const router = express.Router();

//GETs

//POSTs
  router.post('/login', UserController.validateUser);

export default router;  