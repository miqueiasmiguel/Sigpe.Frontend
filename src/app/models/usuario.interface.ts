import { TipoUsuarioEnum } from "../enums/tipo-usuario.enum";

export interface Usuario {
  id?: number,
  email: string,
  senha: string,
  pessoaId: number,
  tipoUsuario: TipoUsuarioEnum
}
