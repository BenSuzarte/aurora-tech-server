import { Results } from "@/models/results";

export interface IEmpresa {
  id?: string;
  idUser: string;
  cnpj: string;
  sede: string;
}

export interface IEmpresaResults extends Results {
    empresa?: IEmpresa;
}

export interface IEmpresaService {
  createEmpresa(empresa: IEmpresa): Promise<IEmpresaResults>;
}