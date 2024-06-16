import { Results } from "@/models/results";

export interface IJobs {
  id?: string;
  idUsuario?: string;
  titulo: string,
  descricao: string,
  localidade: string,
  modalidade: string,
  periodo: string
}

export interface IJobsResults extends Results {
  job?: IJobs;
  getJobs?: IJobs[]
}

export interface IJobsService {
  createJob(job: IJobs, idUsuario: string): Promise<IJobsResults>
  getJobs(): Promise<IJobsResults>
}