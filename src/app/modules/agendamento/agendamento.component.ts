import { TipoUsuarioEnum } from './../../enums/tipo-usuario.enum';
import { PacienteService } from './../../services/paciente.service';
import { Component, Input, LOCALE_ID, inject } from '@angular/core';
import { AgendamentoService } from '../../services/agendamento.service';
import { MedicoService } from '../../services/medico.service';
import { Agendamento } from '../../models/agendamento.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { CommonModule, formatDate } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Paciente } from '../../models/paciente.interface';
import { Medico } from '../../models/medico.interface';
import { StatusAgendamentoEnum } from '../../enums/status-agendamento.enum';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-agendamento',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule, RouterLink],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR' }],
  templateUrl: './agendamento.component.html',
  styleUrl: './agendamento.component.scss'
})
export class AgendamentoComponent {
  @Input() id?: number;
  private tokenService = inject(TokenService);
  private agendamentoService = inject(AgendamentoService);
  private medicoService = inject(MedicoService);
  private pacienteService = inject(PacienteService);

  private router = inject(Router);

  private tipoUsuario: TipoUsuarioEnum | null = null;
  private pessoaId: number | null = null;
  public pacientes: Paciente[] = [];
  public medicos: Medico[] = [];
  public statusAgendamento = [
    { display: 'Cancelado', value: StatusAgendamentoEnum.CANCELADO },
    { display: 'Finalizado', value: StatusAgendamentoEnum.FINALIZADO },
    { display: 'Solicitado', value: StatusAgendamentoEnum.SOLICITADO },
  ];

  private agendamento: Agendamento = {
    dataHora: new Date(),
    motivo: '',
    status: 0,
    pacienteId: 0,
    medicoId: 0
  };

  public editMode: boolean = false;

  public showAlert: boolean = false;
  public alertClass: string = '';
  public alertMessage: string = '';

  public form: FormGroup = new FormGroup({
    nome: new FormControl(),
    dataHora: new FormControl(),
    motivo: new FormControl(),
    status: new FormControl(),
    pacienteId: new FormControl(),
    medicoId: new FormControl(),
  });

  ngOnInit(): void {
    this.tipoUsuario = this.tokenService.getUserRole();
    this.pessoaId = this.tokenService.getPessoaId();

    this.inicializaFormulario();
    this.carregarPacientes();
    this.carregarMedicos();
  }

  private carregarPacientes(): void {
    if (this.tipoUsuario == TipoUsuarioEnum.PACIENTE) {
      this.pacienteService.getById(this.pessoaId ?? 0).subscribe({
        next: (paciente) => {
          this.pacientes = [paciente];
        },
        error: (err) => {
          this.mostrarAlerta(`Erro ${err.error.message}`, false);
        }
      });
    } else {
      this.pacienteService.get().subscribe({
        next: (pacientes) => {
          this.pacientes = pacientes;
        },
        error: (err) => {
          this.mostrarAlerta(`Erro ${err.error.message}`, false);
        }
      });
    }
  }

  private carregarMedicos(): void {
    if (this.tipoUsuario == TipoUsuarioEnum.MEDICO) {
      this.medicoService.getById(this.pessoaId ?? 0).subscribe({
        next: (medico) => {
          this.medicos = [medico];
        },
        error: (err) => {
          this.mostrarAlerta(`Erro ${err.error.message}`, false);
        }
      });
    } else {
      this.medicoService.get().subscribe({
        next: (medicos) => {
          this.medicos = medicos;
        },
        error: (err) => {
          this.mostrarAlerta(`Erro ${err.error.message}`, false);
        }
      });
    }
  }

  private inicializaFormulario(): void {
    if (this.id) {
      this.agendamentoService.getById(this.id).subscribe((agendamento) => {
        this.form.patchValue({
          dataHora: formatDate(agendamento.dataHora, 'yyyy-MM-ddTHH:mm:ss', 'en'),
          motivo: agendamento.motivo,
          status: agendamento.status,
          pacienteId: agendamento.pacienteId,
          medicoId: agendamento.medicoId
        });
      })

      this.form.disable();
    }
  }

  public editar(): void {
    this.editMode = true;
    this.form.enable();
  }

  public salvar(): void {
    if (!this.form.valid) {
      return;
    }

    this.agendamento.dataHora = new Date(new Date(this.form.value.dataHora).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }));
    this.agendamento.motivo = this.form.value.motivo;
    this.agendamento.status = parseInt(this.form.value.status);
    this.agendamento.pacienteId = parseInt(this.form.value.pacienteId);
    this.agendamento.medicoId = parseInt(this.form.value.medicoId);

    if (this.id) {
      this.agendamento.id = this.id;
      this.atualizar(this.agendamento);
      return;
    }

    this.cadastrar(this.agendamento);
    this.form.reset();
  }

  public deletar(id: number): void {
    this.agendamentoService.delete(id).subscribe({
      next: () => {
        this.router.navigate(['agendamento']);
      },
      error: (err) => {
        this.mostrarAlerta(`Erro: ${err.error.message}`, false);
      }
    });
  }

  private cadastrar(agendamento: Agendamento): void {
    this.agendamentoService.create(agendamento).subscribe({
      next: (agendamento) => {
        this.mostrarAlerta(`Agendamento cadastrado com sucesso!`, true);
      },
      error: (err) => {
        this.mostrarAlerta(`Erro: ${err.error.message}`, false);
      }
    });
  }

  private atualizar(agendamento: Agendamento): void {
    this.agendamentoService.update(agendamento).subscribe({
      next: (agendamento) => {
        this.mostrarAlerta(`Agendamento atualizado com sucesso!`, true);
        this.editMode = false;
        this.form.disable();
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
