import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MedicoService } from '../../services/medico.service';
import { Medico } from '../../models/medico.interface';

@Component({
  selector: 'app-medico-cadastro',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './medico-cadastro.component.html',
  styleUrl: './medico-cadastro.component.scss'
})
export class MedicoCadastroComponent {
  @Input() id?: number;
  private medicoService = inject(MedicoService);
  private router = inject(Router);

  private medico: Medico = {
    nome: '',
    dataNascimento: new Date(),
    endereco: '',
    telefone: '',
    crm: '',
    especialidadeId: 0
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
    crm: new FormControl(),
    especialidadeId: new FormControl()
  });

  ngOnInit(): void {
    this.inicializaFormulario();
  }

  private inicializaFormulario(): void {
    if (this.id) {
      this.medicoService.getById(this.id).subscribe((medico) => {
        this.form.patchValue({
          nome: medico.nome,
          dataNascimento: medico.dataNascimento,
          endereco: medico.endereco,
          telefone: medico.telefone,
          crm: medico.crm,
          especialidadeId: medico.especialidadeId
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

    this.medico.nome = this.form.value.nome;
    this.medico.dataNascimento = this.form.value.dataNascimento;
    this.medico.endereco = this.form.value.endereco;
    this.medico.telefone = this.form.value.telefone;
    this.medico.crm = this.form.value.crm;
    this.medico.especialidadeId = this.form.value.especialidadeId;

    if (this.id) {
      this.medico.id = this.id;
      this.atualizar(this.medico);
      return;
    }

    this.cadastrar(this.medico);
    this.form.reset();
  }

  public deletar(id: number): void {
    this.medicoService.delete(id).subscribe({
      next: () => {
        this.router.navigate(['medico']);
      },
      error: (err) => {
        this.mostrarAlerta(`Erro: ${err.error.message}`, false);
      }
    });
  }

  private cadastrar(medico: Medico): void {
    this.medicoService.create(medico).subscribe({
      next: (medico) => {
        this.mostrarAlerta(`Médico ${medico.nome} cadastrado com sucesso!`, true);
      },
      error: (err) => {
        console.log(err);
        this.mostrarAlerta(`Erro: ${err.error.message}`, false);
      }
    });
  }

  private atualizar(medico: Medico): void {
    this.medicoService.update(medico).subscribe({
      next: (medico) => {
        this.mostrarAlerta(`Médico ${medico.nome} atualizado com sucesso!`, true);
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
