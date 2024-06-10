import {Request, Response} from 'express';
import JobsService from '@/services/Jobs/service';

class JobController {
  async createJob(req: Request, res: Response) {
    console.log(req.body, "\n", req.params.idUsuario)
    const validate = await JobsService.createJob(req.body, req.params.idUsuario);
  }
}

export default new JobController();