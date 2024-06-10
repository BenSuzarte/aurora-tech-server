import { Results } from "@/models/results";
import { ICandidato } from "./Candidato/model";
import { IEmpresa } from "./Empresa/model";

export interface IUser {
  idUser?: string;
  email: string;
  nome: string;
  senha: string;
  contato: string;
  UType?: string;
}

export interface IUserCandidato {
  email: string;
  senha: string;
}

export interface IUserLogIn {
  email: string;
  senha: string;
}

export interface IUserResults extends Results {
  user?: IUser;
}

export interface IUserService {
  createUser(user: ICandidato | IEmpresa): Promise<IUserResults>
  signIn(user: IUserLogIn): Promise<IUserResults>
}
