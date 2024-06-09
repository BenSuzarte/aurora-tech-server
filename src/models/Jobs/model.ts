import { Results } from "@/models/results";

export interface IJobs {
  id?: string;
  titulo: string,
  descricao: string,
  localidade: string,
  modalidade: string,
  periodo: string
}

export interface IJobsResults extends Results {
  job?: IJobs;
}

export interface IJobsService {
  createJob(job: IJobs): Promise<IJobsResults>
  updateJob(job: IJobs): Promise<IJobsResults>
  deleteJob(id: string): Promise<IJobsResults>
  getJobs(): Promise<IJobsResults>
}