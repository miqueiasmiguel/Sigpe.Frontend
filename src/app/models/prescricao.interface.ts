export interface Prescricao {
  id?: number,
  data: Date,
  instrucoes: string,
  medicamentoId: number,
  pacienteId: number,
  medicoId: number
}
