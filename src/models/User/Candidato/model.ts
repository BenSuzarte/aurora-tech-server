import { Results } from "@/models/results";
import { IUser } from "../model";

export interface ICandidato extends IUser {
  idCandidato?: string;
  cpf: string;
  data_nascimento: string;
}

export interface ICandidatoResults extends Results {
  candidato?: ICandidato;
}

export interface ICandidatoService {
  createCandidato(candidato: ICandidato, insertedId: string): Promise<ICandidatoResults>;
}