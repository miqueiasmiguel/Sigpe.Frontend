import { Medicamento } from "./medicamento.interface";
import { Medico } from "./medico.interface";
import { Paciente } from "./paciente.interface";

export interface Prescricao {
  id?: number,
  data: Date,
  instrucoes: string,
  medicamentoId: number,
  pacienteId: number,
  medicoId: number,
  medicamento?: Medicamento,
  paciente?: Paciente,
  medico?: Medico
}
