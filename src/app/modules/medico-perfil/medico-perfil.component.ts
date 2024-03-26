import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { MedicoService } from '../../services/medico.service';
import { AgendamentoService } from '../../services/agendamento.service';
import { PrescricaoService } from '../../services/prescricao.service';
import { StatusAgendamentoEnum } from '../../enums/status-agendamento.enum';
import { Agendamento } from '../../models/agendamento.interface';
import { Prescricao } from '../../models/prescricao.interface';
import { Medico } from '../../models/medico.interface';

@Component({
  selector: 'app-medico-perfil',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './medico-perfil.component.html',
  styleUrl: './medico-perfil.component.scss'
})
export class MedicoPerfilComponent implements OnInit {
  @Input() id?: number;
  private medicoService = inject(MedicoService);
  private agendamentoService = inject(AgendamentoService);
  private prescricaoService = inject(PrescricaoService);

  public showAlert: boolean = false;
  public alertClass: string = '';
  public alertMessage: string = '';

  public statusAgendamento = StatusAgendamentoEnum;

  public agendamentos: Agendamento[] = [];
  public prescricoes: Prescricao[] = [];
  public medico: Medico = {
    nome: '',
    dataNascimento: new Date,
    endereco: '',
    telefone: '',
    crm: '',
    especialidadeId: 0
  }

  ngOnInit(): void {
    this.alimentarPerfil();
    this.carregarAgendamentos();
    this.carregarPrescricoes();
  }

  private carregarAgendamentos(): void {
    if (!this.id)
      return;

    this.agendamentoService.getByMedicoId(this.id).subscribe({
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

    this.prescricaoService.getByMedicoId(this.id).subscribe({
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

      this.medicoService.getById(this.id).subscribe({
        next: (medico) => {
          this.medico = medico;
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
