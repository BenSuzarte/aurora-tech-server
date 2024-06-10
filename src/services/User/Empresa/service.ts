import db from '@/db-connection';
import { IEmpresa, IEmpresaResults, IEmpresaService } from "@/models/User/Empresa/model";
import { ResultSetHeader } from "mysql2";

class EmpresaService implements IEmpresaService {
  async createEmpresa(candidato: IEmpresa, insertedId: string): Promise<IEmpresaResults> {
    const query: string = "INSERT INTO Empresa (id, cnpj, sede) VALUES (?, ?, ?)";
    const params = [insertedId, candidato.cnpj, candidato.sede];

    try {
      
      const [result] = await db.conn.promise().execute<ResultSetHeader>(query, params);
      
      if (result.affectedRows === 0) {
        return { code: 404, message: "Erro ao criar o candidato, tente novamente mais tarde..." };
      }

      const insertId = result.insertId.toString();

      if (!insertId) {
        return { code: 404, message: "Houve um erro inesperado, tente novamente mais tarde..." };
      }
      
      const newCandidato: IEmpresa = {
        idUser: candidato.idUser,
        email: candidato.email,
        senha: candidato.senha,
        nome: candidato.nome,
        contato: candidato.contato,
        idEmpresa: insertId,
        cnpj: candidato.cnpj,
        sede: candidato.sede
      };

      return { code: 200, message: "Candidato criado com sucesso", empresa: newCandidato };
    } catch (error) {
      console.error("Erro ao criar candidato:", error);
      return { code: 500, message: "Erro ao criar candidato" };
    }
  }
}

export default new EmpresaService();