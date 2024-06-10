import { Results } from "@/models/results";
import { IUser } from "../model";

export interface IEmpresa extends IUser {
  idEmpresa?: string;
  idUser: string;
  cnpj: string;
  sede: string;
}

export interface IEmpresaResults extends Results {
    empresa?: IEmpresa;
}

export interface IEmpresaService {
  createEmpresa(empresa: IEmpresa, insertedId: string): Promise<IEmpresaResults>;
}