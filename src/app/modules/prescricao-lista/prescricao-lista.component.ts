import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { PrescricaoService } from '../../services/prescricao.service';
import { Prescricao } from '../../models/prescricao.interface';
import { TokenService } from '../../services/token.service';
import { TipoUsuarioEnum } from '../../enums/tipo-usuario.enum';

@Component({
  selector: 'app-prescricao-lista',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './prescricao-lista.component.html',
  styleUrl: './prescricao-lista.component.scss'
})
export class PrescricaoListaComponent {
  private tokenService = inject(TokenService);
  private prescricaoService = inject(PrescricaoService);

  private tipoUsuario: TipoUsuarioEnum | null = null;
  private pessoaId: number | null = null;

  public showAlert: boolean = false;
  public alertClass: string = '';
  public alertMessage: string = '';

  public prescricoes: Prescricao[] = [];

  ngOnInit(): void {
    this.tipoUsuario = this.tokenService.getUserRole();
    this.pessoaId = this.tokenService.getPessoaId();
    this.alimentarLista();
  }

  private alimentarLista() {
    if (this.tipoUsuario == TipoUsuarioEnum.RECEPCIONISTA || this.tipoUsuario == TipoUsuarioEnum.ADMINISTRADOR ) {
      this.prescricaoService.get().subscribe({
        next: (prescricoes) => {
          this.prescricoes = prescricoes
        },
        error: (err) => {
          this.mostrarAlerta(`Erro: ${err.error.message}`, false);
        }
      });
    } else if (this.tipoUsuario == TipoUsuarioEnum.MEDICO) {
      this.prescricaoService.getByMedicoId(this.pessoaId ?? 0).subscribe({
        next: (prescricoes) => {
          this.prescricoes = prescricoes
        },
        error: (err) => {
          this.mostrarAlerta(`Erro: ${err.error.message}`, false);
        }
      });
    } else if (this.tipoUsuario == TipoUsuarioEnum.PACIENTE) {
      this.prescricaoService.getByPacienteId(this.pessoaId ?? 0).subscribe({
        next: (prescricoes) => {
          this.prescricoes = prescricoes
        },
        error: (err) => {
          this.mostrarAlerta(`Erro: ${err.error.message}`, false);
        }
      });
    }
  }

  private mostrarAlerta(mensagem: string, isSuccess: boolean) {
    this.alertClass = isSuccess ? 'alert-success' : 'alert-danger';
    this.alertMessage = mensagem;
    this.showAlert = true;
  }

  public mostrarBotaoNovo() : boolean {
    if (this.tipoUsuario != TipoUsuarioEnum.PACIENTE) {
      return true;
    }

    return false;
  }
}
