import { CommonModule } from '@angular/common';
import { PacienteService } from './../../services/paciente.service';
import { Component, Input, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { Paciente } from '../../models/paciente.interface';
import { StatusAgendamentoEnum } from '../../enums/status-agendamento.enum';
import { RouterLink } from '@angular/router';

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

  public statusAgendamento = StatusAgendamentoEnum;
  public paciente: Paciente = {
    nome: '',
    dataNascimento: new Date,
    endereco: '',
    telefone: '',
  }

  ngOnInit(): void {
    this.alimentarPerfil();
  }

  private alimentarPerfil(): void {
    if (this.id) {
      this.pacienteService.getById(this.id).subscribe({
        next: (paciente) => {
          this.paciente = paciente;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
}
