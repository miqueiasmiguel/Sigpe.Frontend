import { Especialidade } from "./especialidade.interface";

export interface Medico {
  id?: number,
  nome: string,
  dataNascimento: Date,
  endereco: string,
  telefone: string,
  crm: string,
  especialidadeId: number,
  especialidade?: Especialidade
}
