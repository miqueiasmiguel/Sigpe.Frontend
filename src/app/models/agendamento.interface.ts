import { StatusAgendamentoEnum } from "../enums/status-agendamento.enum";

export interface Agendamento {
  id?: number,
  dataHora: Date,
  motivo: string,
  status: StatusAgendamentoEnum,
  pacienteId: number,
  medicoId: number
}
