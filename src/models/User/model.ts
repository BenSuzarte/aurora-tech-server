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

export interface IUserLogInResults {
  code: number;
  message: string;
  user?: IUser;
}

export interface IUserService {
  createUser(user: IUser): IUser
  signIn(user: IUserLogIn): Promise<IUserLogInResults>
}
