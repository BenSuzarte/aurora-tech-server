import UserService from '@/services/User/service';
import db from "@/db-connection";
import { ICandidato, ICandidatoResults, ICandidatoService } from "@/models/User/Candidato/model";
import { ResultSetHeader } from "mysql2";

export class CandidatoService implements ICandidatoService {
  async createCandidato(candidato: ICandidato, insertedId: string): Promise<ICandidatoResults> {
    const candidatoQuery: string = "INSERT INTO Contratado (id, cpf, data_nascimento) VALUES (?, ?, ?)";
    const candidatoParams = [insertedId, candidato.cpf, candidato.data_nascimento];

    try {
      console.log(candidatoParams);

      const [result] = await db.conn.promise().execute<ResultSetHeader>(candidatoQuery, candidatoParams);
      console.log(result);
      
      if (result.affectedRows === 0) {
        return { code: 404, message: "Erro ao criar o candidato, tente novamente mais tarde..." };
      }

      const insertId = result.insertId.toString();

      if (!insertId) {
        return { code: 404, message: "Houve um erro inesperado, tente novamente mais tarde..." };
      }
      
      const newCandidato: ICandidato = {
        idUser: candidato.idUser,
        email: candidato.email,
        senha: candidato.senha,
        nome: candidato.nome,
        contato: candidato.contato,
        idCandidato: insertId,
        cpf: candidato.cpf,
        data_nascimento: candidato.data_nascimento
      };

      console.log(newCandidato)

      return { code: 200, message: "Candidato criado com sucesso", candidato: newCandidato };
    } catch (error) {
      console.error("Erro ao criar candidato:", error);
      return { code: 500, message: "Erro ao criar candidato" };
    }
  }
}

export default new CandidatoService();
