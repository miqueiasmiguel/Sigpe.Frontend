import { Agendamento } from "./agendamento.interface"
import { Medicamento } from "./medicamento.interface"
import { PlanoSaude } from "./plano-saude.interface"
import { Prescricao } from "./prescricao.interface"

export interface Paciente {
  id? : number,
  nome: string,
  dataNascimento: Date,
  endereco: string,
  telefone: string,
  planoSaudeId?: number,
  planoSaude?: PlanoSaude,
  prescricoes?: Prescricao[],
  agendamentos?: Agendamento[],
  alergias?: Medicamento[]
}
