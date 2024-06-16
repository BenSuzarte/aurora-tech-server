import {Request, Response} from 'express';
import JobsService from '@/services/Jobs/service';

class JobController {
  async createJob(req: Request, res: Response) {
    const validate = await JobsService.createJob(req.body, req.body.idUsuario);

    if (!validate) {
      return res.status(500).json({
        message: 'Erro ao criar o job'
      });
    }

    if (validate.code === 404) {
      return res.status(404).json({
        message: 'Não foi possível criar sua nova vaga'
      });
    }

    if (validate.code === 200) {
      return res.status(201).json({
        message: 'Job criado com sucesso'
      });
    }
  }

  async getJobs(req: Request, res: Response) {
    const validate = await JobsService.getJobs();

    if (!validate) {
      return res.status(500).json({
        message: 'Erro de conexão interno'
      });
    }

    if (validate.code === 404) {
      return res.status(404).json({
        message: validate.message
      });
    }

    if (validate.code === 201) {
      return res.status(201).json(validate.getJobs);
    }
  }
}

export default new JobController();