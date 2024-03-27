import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { AgendamentoService } from '../../services/agendamento.service';
import { Agendamento } from '../../models/agendamento.interface';
import { TokenService } from '../../services/token.service';
import { TipoUsuarioEnum } from '../../enums/tipo-usuario.enum';
import { CommonModule } from '@angular/common';
import { StatusAgendamentoEnum } from '../../enums/status-agendamento.enum';

@Component({
  selector: 'app-agendamento-lista',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './agendamento-lista.component.html',
  styleUrl: './agendamento-lista.component.scss'
})
export class AgendamentoListaComponent implements OnInit {
  private agendamentoService = inject(AgendamentoService);
  private tokenService = inject(TokenService);

  public statusAgendamento = StatusAgendamentoEnum;

  public showAlert: boolean = false;
  public alertClass: string = '';
  public alertMessage: string = '';

  public agendamentos: Agendamento[] = [];

  ngOnInit(): void {
    this.alimentarLista();
  }

  private alimentarLista(): void {
    const tipoUsuario = this.tokenService.getUserRole();
    const pessoaId = this.tokenService.getPessoaId();

    if (tipoUsuario == TipoUsuarioEnum.RECEPCIONISTA || tipoUsuario == TipoUsuarioEnum.ADMINISTRADOR ) {
      this.agendamentoService.get().subscribe({
        next: (agendamentos) => {
          this.agendamentos = agendamentos
        },
        error: (err) => {
          this.mostrarAlerta(`Erro: ${err.error.message}`, false);
        }
      });
    } else if (tipoUsuario == TipoUsuarioEnum.MEDICO) {
      this.agendamentoService.getByMedicoId(pessoaId ?? 0).subscribe({
        next: (agendamentos) => {
          this.agendamentos = agendamentos
        },
        error: (err) => {
          this.mostrarAlerta(`Erro: ${err.error.message}`, false);
        }
      });
    } else if (tipoUsuario == TipoUsuarioEnum.PACIENTE) {
      this.agendamentoService.getByPacienteId(pessoaId ?? 0).subscribe({
        next: (agendamentos) => {
          this.agendamentos = agendamentos
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
}
