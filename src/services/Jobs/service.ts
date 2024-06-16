import { IJobs, IJobsResults, IJobsService } from "@/models/Jobs/model";
import db from "@/db-connection"
import { ResultSetHeader } from "mysql2";

class JobsService implements IJobsService {
  async createJob(job: IJobs, idUsuario: string): Promise<IJobsResults> {

    const query: string = "INSERT INTO Vagas (idUsuario, titulo, descricao, localidade, modalidade, periodo) VALUES (?, ?, ?, ?, ?, ?)";
    const params: String[] = [idUsuario, job.titulo, job.descricao, job.localidade, job.modalidade, job.periodo];

    try {
      
      const [result] = await db.conn.promise().execute<ResultSetHeader>(query, params);
      
      if (result.affectedRows === 0) {
        return { code: 404, message: "Erro ao criar a vaga, tente novamente mais tarde..." };
      }

      const insertId = result.insertId.toString();

      if (!insertId) {
        return { code: 404, message: "Houve um erro inesperado, tente novamente mais tarde..." };
      }

      const newJob: IJobs = {
        id: insertId,
        idUsuario: idUsuario,
        titulo: job.titulo,
        descricao: job.descricao,
        localidade: job.localidade,
        modalidade: job.modalidade,
        periodo: job.periodo
      }

      return { code: 200, message: "Ok", job: newJob}

    } catch (error) {
      console.log(error)
      return { code: 500, message: "Error"}
    }

  }
  async getJobs(): Promise<IJobsResults> {
    const query = "SELECT * FROM Vagas"

    try {
      
      const [result] = await db.conn.promise().execute(query)

      if (!result) {
        return { code: 404, message: "Erro ao buscar as vagas, tente novamente mais tarde..." };
      }

      const jobs: IJobs[] = result as IJobs[]

      return {code: 201, message: 'Job successfully', getJobs: jobs};

    } catch (err) {
      return {code: 500, message: 'Erro interno de conexão'}
    }
  }
}

export default new JobsService();