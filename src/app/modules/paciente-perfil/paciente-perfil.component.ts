import { CommonModule } from '@angular/common';
import { PacienteService } from './../../services/paciente.service';
import { Component, Input, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { Paciente } from '../../models/paciente.interface';
import { StatusAgendamentoEnum } from '../../enums/status-agendamento.enum';
import { RouterLink } from '@angular/router';
import { AgendamentoService } from '../../services/agendamento.service';
import { PrescricaoService } from '../../services/prescricao.service';
import { Agendamento } from '../../models/agendamento.interface';
import { Prescricao } from '../../models/prescricao.interface';

@Component({
  selector: 'app-paciente-perfil',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './paciente-perfil.component.html',
  styleUrl: './paciente-perfil.component.scss'
})
export class PacientePerfilComponent implements OnInit {
  @Input() id?: number;
  private pacienteService = inject(PacienteService);
  private agendamentoService = inject(AgendamentoService);
  private prescricaoService = inject(PrescricaoService);

  public showAlert: boolean = false;
  public alertClass: string = '';
  public alertMessage: string = '';

  public statusAgendamento = StatusAgendamentoEnum;

  public agendamentos: Agendamento[] = [];
  public prescricoes: Prescricao[] = [];
  public paciente: Paciente = {
    nome: '',
    dataNascimento: new Date,
    endereco: '',
    telefone: '',
  }

  ngOnInit(): void {
    this.alimentarPerfil();
    this.carregarAgendamentos();
    this.carregarPrescricoes();
  }

  private carregarAgendamentos(): void {
    if (!this.id)
      return;

    this.agendamentoService.getByPacienteId(this.id).subscribe({
      next: (agendamentos) => {
        this.agendamentos = agendamentos;
      },
      error: (err) => {
        this.mostrarAlerta(`Erro: ${err.error.message}`, false);
      }
    });
  }

  private carregarPrescricoes(): void {
    if (!this.id)
      return;

    this.prescricaoService.getByPacienteId(this.id).subscribe({
      next: (prescricoes) => {
        this.prescricoes = prescricoes;
      },
      error: (err) => {
        this.mostrarAlerta(`Erro: ${err.error.message}`, false);
      }
    });
  }

  private alimentarPerfil(): void {
    if (!this.id)
      return;

      this.pacienteService.getById(this.id).subscribe({
        next: (paciente) => {
          this.paciente = paciente;
        },
        error: (err) => {
          this.mostrarAlerta(`Erro: ${err.error.message}`, false);
        }
      });
  }

  private mostrarAlerta(mensagem: string, isSuccess: boolean) {
    this.alertClass = isSuccess ? 'alert-success' : 'alert-danger';
    this.alertMessage = mensagem;
    this.showAlert = true;
  }
}
