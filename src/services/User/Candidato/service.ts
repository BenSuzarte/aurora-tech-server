import db from "@/db-connection";
import { ICandidato, ICandidatoResults, ICandidatoService } from "@/models/User/Candidato/model";
import { ResultSetHeader } from "mysql2";

export class CandidatoService implements ICandidatoService {
  async createCandidato(candidato: ICandidato): Promise<ICandidatoResults> {
    const query: string = "INSERT INTO Contratado (idUser, cpf, data_nascimento) VALUES (?, ?, ?)";
    const params: (string | number)[] = [candidato.idUser, candidato.cpf, candidato.data_nascimento];

    try {
      const [result] = await db.conn.promise().execute<ResultSetHeader>(query, params);
      
      if (result.affectedRows === 0) {
        return { code: 404, message: "Erro ao criar o candidato, tente novamente mais tarde..." };
      }

      const insertId = result.insertId.toString();

      if (!insertId) {
        return { code: 404, message: "Houve um erro inesperado, tente novamente mais tarde..." };
      }
      
      const newCandidato: ICandidato = {
        id: insertId,
        idUser: candidato.idUser,
        cpf: candidato.cpf,
        data_nascimento: candidato.data_nascimento
      };

      return { code: 200, message: "Candidato criado com sucesso", candidato: newCandidato };
    } catch (error) {
      console.error("Erro ao criar candidato:", error);
      return { code: 500, message: "Erro ao criar candidato" };
    }
  }
}

export default new CandidatoService();
