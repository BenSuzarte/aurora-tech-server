import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { IUser, IUserLogIn, IUserResults, IUserService } from "@/models/User/model";
import db from '@/db-connection';
import CandidatoService from './Candidato/service';
import { ICandidato } from '@/models/User/Candidato/model';
import { IEmpresa } from '@/models/User/Empresa/model';
import EmpresaService from './Empresa/service';

class UserService implements IUserService {

  isCandidato(user: ICandidato | IEmpresa): user is ICandidato {
    return (user as ICandidato).cpf !== undefined;
  }

  isEmpresa(user: ICandidato | IEmpresa): user is IEmpresa {
    return (user as IEmpresa).cnpj !== undefined;
  }

  async addInDatabase(query: string, params: string[], user: ICandidato | IEmpresa): Promise<ResultSetHeader[]> {
    const [result] = await db.conn.promise().execute<ResultSetHeader>(query, params);
  
    if (this.isCandidato(user)) {
      await CandidatoService.createCandidato(user as ICandidato, result.insertId.toString());
    }

    if (this.isEmpresa(user)) {
      await EmpresaService.createEmpresa(user as IEmpresa, result.insertId.toString());
    }

    return [result];
  }

  async createUser(user: ICandidato | IEmpresa): Promise<IUserResults> {
    const query: string = "INSERT INTO Usuario (email, senha, nome, contato) VALUES (?, ?, ?, ?)";
    const params: string[] = [user.email, user.senha, user.nome, user.contato];
  
    try {
      const checkQuery: string = "SELECT id FROM Usuario WHERE email = ?";
      const [checkResult] = await db.conn.promise().query<RowDataPacket[]>(checkQuery, [user.email]);

      if (checkResult.length > 0) {
        return { code: 404, message: 'Este usuário já existe!'}
      }

      const [result] = await this.addInDatabase(query, params, user)

      if (result.affectedRows === 0) {
        return { code: 404, message: "Erro ao criar o usuário, tente novamente mais tarde..." };
      }
  
      const insertId = result.insertId.toString();
  
      if (!insertId) {
        return { code: 404, message: "Houve um erro inesperado, tente novamente mais tarde..." };
      }
      
      const newUser: IUser = {
        idUser: insertId,
        email: user.email,
        senha: user.senha,
        nome: user.nome,
        contato: user.contato
      };
  
      return { code: 200, message: "Usuário criado com sucesso", user: newUser };
  
    } catch (error: any) {
      console.error("Erro ao criar usuário:", error);
      return { code: 500, message: "Erro ao criar usuário" };
    }
  }
  
  async signIn(user: IUserLogIn): Promise<IUserResults> {
    const query: string = "SELECT * FROM Usuario WHERE email = ? AND senha = ?";
    const params: string[] = [user.email, user.senha];

    try {
      const [rows] = await db.conn.promise().query<RowDataPacket[]>(query, params);

      if (rows.length === 0) {
        return { code: 404, message: "Usuário não encontrado" };
      }

      const userData = rows[0];
      const usuario: IUser = {
        idUser: userData.id,
        email: userData.email,
        senha: userData.senha,
        nome: userData.nome,
        contato: userData.contato
      };

      return { code: 200, message: "Usuário encontrado", user: usuario };
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      return { code: 500, message: "Erro ao realizar login" };
    }
  }
}

export default new UserService();
