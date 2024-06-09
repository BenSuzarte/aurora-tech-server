import UserController from '@/controllers/User/controller';

import express from 'express';
const router = express.Router();

//GETs
  router.get('/', (req, res) => {
    res.send('Hello World!');
  })
//POSTs
  router.post('/login', UserController.validateUser);

export default router;  