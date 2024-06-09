import { Results } from "@/models/results";

export interface ICandidato {
  id?: string;
  idUser: string;
  cpf: string;
  data_nascimento: string;
}

export interface ICandidatoResults extends Results {
    candidato?: ICandidato;
}

export interface ICandidatoService {
  createCandidato(candidato: ICandidato): Promise<ICandidatoResults>;
}