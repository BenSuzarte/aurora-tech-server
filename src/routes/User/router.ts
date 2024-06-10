import UserController from '@/controllers/User/controller';

import express from 'express';
const router = express.Router();

//GETs


//POSTs
  router.post('/login', UserController.validateUser);
  router.post('/register', UserController.createUser);

//PUTs


//DELETEs


export default router;  