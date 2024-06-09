import { Results } from "@/models/results";

export interface IUser {
  id?: string;
  email: string;
  nome: string;
  senha: string;
  contato: string;
}

export interface IUserLogIn {
  email: string;
  senha: string;
}

export interface IUserResults extends Results {
  user?: IUser;
}

export interface IUserService {
  createUser(user: IUser): Promise<IUserResults>
  signIn(user: IUserLogIn): Promise<IUserResults>
}
