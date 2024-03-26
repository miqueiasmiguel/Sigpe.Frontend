import { StatusAgendamentoEnum } from "../enums/status-agendamento.enum";
import { Medico } from "./medico.interface";
import { Paciente } from "./paciente.interface";

export interface Agendamento {
  id?: number,
  dataHora: Date,
  motivo: string,
  status: StatusAgendamentoEnum,
  pacienteId: number,
  medicoId: number
  paciente?: Paciente,
  medico?: Medico
}
