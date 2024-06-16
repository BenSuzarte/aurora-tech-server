import UserController from '@/controllers/User/controller';
import JobController from '@/controllers/Jobs/controller';

import express from 'express';
const router = express.Router();

//GETs
  router.get('/jobs', JobController.getJobs)

//POSTs
  router.post('/login', UserController.validateUser);
  router.post('/register', UserController.createUser);
  router.post('/job/create/:idUsuario', JobController.createJob);

//PUTs


//DELETEs


export default router;  