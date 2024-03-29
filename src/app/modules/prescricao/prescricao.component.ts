import { Component, Input, inject } from '@angular/core';
import { MedicamentoService } from '../../services/medicamento.service';
import { CommonModule, formatDate } from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PrescricaoService } from '../../services/prescricao.service';
import { MedicoService } from '../../services/medico.service';
import { PacienteService } from '../../services/paciente.service';
import { Medicamento } from '../../models/medicamento.interface';
import { Medico } from '../../models/medico.interface';
import { Paciente } from '../../models/paciente.interface';
import { Prescricao } from '../../models/prescricao.interface';
import { TokenService } from '../../services/token.service';
import { TipoUsuarioEnum } from '../../enums/tipo-usuario.enum';

@Component({
  selector: 'app-prescricao',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './prescricao.component.html',
  styleUrl: './prescricao.component.scss'
})
export class PrescricaoComponent {
  @Input() id?: number;
  private tokenService = inject(TokenService);
  private prescricaoService = inject(PrescricaoService);
  private medicamentoService = inject(MedicamentoService);
  private medicoService = inject(MedicoService);
  private pacienteService = inject(PacienteService);
  private router = inject(Router);

  public tipoUsuarioEnum = TipoUsuarioEnum;
  public tipoUsuario: TipoUsuarioEnum | null = null;
  private pessoaId: number | null = null;
  public medicamentos: Medicamento[] = [];
  public medicos: Medico[] = [];
  public pacientes: Paciente[] = [];
  private prescricao: Prescricao = {
    data: new Date,
    instrucoes: '',
    medicamentoId: 0,
    pacienteId: 0,
    medicoId: 0
  }

  public editMode: boolean = false;
  public showAlert: boolean = false;
  public alertClass: string = '';
  public alertMessage: string = '';

  form: FormGroup = new FormGroup({
    data: new FormControl(),
    instrucoes: new FormControl(),
    medicamentoId: new FormControl(),
    pacienteId: new FormControl(),
    medicoId: new FormControl(),
  });

  ngOnInit(): void {
    this.tipoUsuario = this.tokenService.getUserRole();
    this.pessoaId = this.tokenService.getPessoaId();

    this.inicializaFormulario();
    this.carregarMedicamentos();
    this.carregarPacientes();
    this.carregarMedicos();
  }

  private carregarMedicamentos(): void {
    this.medicamentoService.get().subscribe({
      next: (medicamentos) => {
        this.medicamentos = medicamentos;
      },
      error: (err) => {
        this.mostrarAlerta(`Erro ${err.error.message}`, false);
      }
    });
  }

  private carregarPacientes(): void {
    this.pacienteService.get().subscribe({
      next: (pacientes) => {
        this.pacientes = pacientes;
      },
      error: (err) => {
        this.mostrarAlerta(`Erro ${err.error.message}`, false);
      }
    });
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
      this.prescricaoService.getById(this.id).subscribe((prescricao) => {
        this.form.patchValue({
          data: formatDate(prescricao.data, 'yyyy-MM-dd', 'en'),
          instrucoes: prescricao.instrucoes,
          medicamentoId: prescricao.medicamentoId,
          pacienteId: prescricao.pacienteId,
          medicoId: prescricao.medicoId
        });
      });

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

    this.prescricao.data = this.form.value.data;
    this.prescricao.instrucoes = this.form.value.instrucoes;
    this.prescricao.medicamentoId = parseInt(this.form.value.medicamentoId);
    this.prescricao.pacienteId = parseInt(this.form.value.pacienteId);
    this.prescricao.medicoId = parseInt(this.form.value.medicoId);

    if (this.id) {
      this.prescricao.id = this.id;
      this.atualizar(this.prescricao);
      return;
    }

    this.cadastrar(this.prescricao);
    this.form.reset();
  }

  public deletar(id: number): void {
    this.prescricaoService.delete(id).subscribe({
      next: () => {
        this.router.navigate(['prescricao']);
      },
      error: (err) => {
        this.mostrarAlerta(`Erro: ${err.error.message}`, false);
      }
    });
  }

  private cadastrar(prescricao: Prescricao): void {
    this.prescricaoService.create(prescricao).subscribe({
      next: () => {
        this.mostrarAlerta(`Prescrição cadastrada com sucesso!`, true);
      },
      error: (err) => {
        this.mostrarAlerta(`Erro: ${err.error.message}`, false);
      }
    });
  }

  private atualizar(prescricao: Prescricao): void {
    this.prescricaoService.update(prescricao).subscribe({
      next: () => {
        this.mostrarAlerta(`Prescrição atualizada com sucesso!`, true);
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
