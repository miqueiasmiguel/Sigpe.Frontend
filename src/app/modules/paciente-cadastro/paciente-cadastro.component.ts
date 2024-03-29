import { CommonModule, formatDate } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { PlanoSaudeService } from '../../services/plano-saude.service';
import { PlanoSaude } from '../../models/plano-saude.interface';
import { Paciente } from '../../models/paciente.interface';
import { MedicamentoService } from '../../services/medicamento.service';
import { Medicamento } from '../../models/medicamento.interface';

@Component({
  selector: 'app-paciente-cadastro',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './paciente-cadastro.component.html',
  styleUrl: './paciente-cadastro.component.scss'
})
export class PacienteCadastroComponent {
  @Input() id?: number;
  private pacienteService = inject(PacienteService);
  private planoSaudeService = inject(PlanoSaudeService);
  private medicamentoService = inject(MedicamentoService);
  public router = inject(Router);

  public planosSaude: PlanoSaude[] = [];
  public medicamentos: Medicamento[] = [];
  public alergias: Medicamento[] = [];

  private paciente: Paciente = {
    nome: '',
    dataNascimento: new Date(),
    endereco: '',
    telefone: '',
    planoSaudeId: 0
  }

  public editMode: boolean = false;

  public showAlert: boolean = false;
  public alertClass: string = '';
  public alertMessage: string = '';

  form: FormGroup = new FormGroup({
    nome: new FormControl(),
    dataNascimento: new FormControl(),
    endereco: new FormControl(),
    telefone: new FormControl(),
    planoSaudeId: new FormControl(),
    medicamentoId: new FormControl()
  });

  ngOnInit(): void {
    this.carregarPlanosSaude();
    this.carregarMedicamentos();
    this.inicializaFormulario();
  }

  private carregarPlanosSaude(): void {
    this.planoSaudeService.get().subscribe({
      next: (planosSaude) => {
        this.planosSaude = planosSaude;
      },
      error: (err) => {
        this.mostrarAlerta(`Erro: ${err.error.message}`, false);
      }
    });
  }

  private carregarMedicamentos(): void {
    this.medicamentoService.get().subscribe({
      next: (medicamentos) => {
        this.medicamentos = medicamentos;
      },
      error: (err) => {
        this.mostrarAlerta(`Erro: ${err.error.message}`, false);
      }
    });
  }

  private inicializaFormulario(): void {
    if (this.id) {
      this.pacienteService.getById(this.id).subscribe((paciente) => {
        this.form.patchValue({
          nome: paciente.nome,
          dataNascimento: formatDate(paciente.dataNascimento, 'yyyy-MM-dd', 'en'),
          endereco: paciente.endereco,
          telefone: paciente.telefone,
          planoSaudeId: paciente.planoSaudeId
        });
        if (paciente.alergias) {
          this.alergias = paciente.alergias;
        }
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

    this.paciente.nome = this.form.value.nome;
    this.paciente.dataNascimento = this.form.value.dataNascimento;
    this.paciente.endereco = this.form.value.endereco;
    this.paciente.telefone = this.form.value.telefone;
    this.paciente.planoSaudeId = this.form.value.planoSaudeId;
    this.paciente.alergias = this.alergias;

    if (this.id) {
      this.paciente.id = this.id;
      this.atualizar(this.paciente);
      return;
    }

    this.cadastrar(this.paciente);
  }

  public deletar(id: number): void {
    this.pacienteService.delete(id).subscribe({
      next: () => {
        this.router.navigate(['paciente']);
      },
      error: (err) => {
        this.mostrarAlerta(`Erro: ${err.error.message}`, false);
      }
    });
  }

  private cadastrar(paciente: Paciente): void {
    this.pacienteService.create(paciente).subscribe({
      next: (paciente) => {
        this.mostrarAlerta(`Paciente ${paciente.nome} cadastrado com sucesso!`, true);
        this.form.reset();
        this.alergias = [];
      },
      error: (err) => {
        this.mostrarAlerta(`Erro: ${err.error.message}`, false);
      }
    });
  }

  private atualizar(paciente: Paciente): void {
    this.pacienteService.update(paciente).subscribe({
      next: (paciente) => {
        this.mostrarAlerta(`Paciente ${paciente.nome} atualizado com sucesso!`, true);
        this.editMode = false;
        this.form.disable();
      },
      error: (err) => {
        this.mostrarAlerta(`Erro: ${err.error.message}`, false);
      }
    });
  }

  public adicionarAlergia(): void {
    const medicamento = this.medicamentos.filter(m => m.id == parseInt(this.form.value.medicamentoId))[0];

    if (this.alergias.includes(medicamento)) {
      return;
    }

    if (medicamento) {
      this.alergias.push(medicamento);
    }

    this.form.controls['medicamentoId'].setValue('');
  }

  public removerAlergia(id: number): void {
    this.alergias = this.alergias.filter(m => m.id != id);
  }

  private mostrarAlerta(mensagem: string, isSuccess: boolean) {
    this.alertClass = isSuccess ? 'alert-success' : 'alert-danger';
    this.alertMessage = mensagem;
    this.showAlert = true;
  }
}
