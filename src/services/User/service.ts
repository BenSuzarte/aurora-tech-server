import { RowDataPacket } from 'mysql2';
import { IUser, IUserLogIn, IUserLogInResults, IUserService } from "@/models/User/model";
import db from '@/db-connection';

class UserService implements IUserService {
  createUser(user: IUser): IUser {
    throw new Error("Method not implemented.");
  }

  async signIn(user: IUserLogIn): Promise<IUserLogInResults> {
    const query: string = "SELECT * FROM Usuario WHERE email = ? AND senha = ?";
    const params: any[] = [user.email, user.senha];

    try {
      const [rows] = await db.conn.promise().query<RowDataPacket[]>(query, params);

      if (rows.length === 0) {
        return { code: 404, message: "Usuário não encontrado" };
      }

      const userData = rows[0];
      const usuario: IUser = {
        id: userData.id,
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
