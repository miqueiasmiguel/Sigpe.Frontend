import { Component, Input, OnInit, inject } from '@angular/core';
import { EspecialidadeService } from '../../services/especialidade.service';
import { Router, RouterLink } from '@angular/router';
import { Especialidade } from '../../models/especialidade.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-especialidade',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './especialidade.component.html',
  styleUrl: './especialidade.component.scss'
})
export class EspecialidadeComponent implements OnInit {
  @Input() id?: number;
  private especialidadeService = inject(EspecialidadeService);
  private router = inject(Router);

  private especialidade: Especialidade = { nome: '', descricao: '' };

  public editMode: boolean = false;

  public showAlert: boolean = false;
  public alertClass: string = '';
  public alertMessage: string = '';

  especialidadeForm: FormGroup = new FormGroup({
    nome: new FormControl(''),
    descricao: new FormControl(''),
  });

  ngOnInit(): void {
    this.inicializaFormulario();
  }

  private inicializaFormulario(): void {
    if (this.id) {
      this.especialidadeService.getById(this.id).subscribe((especialidade) => {
        this.especialidadeForm.patchValue({
          nome: especialidade.nome,
          descricao: especialidade.descricao
        });
      })

      this.especialidadeForm.disable();
    }
  }

  public editar(): void {
    this.editMode = true;
    this.especialidadeForm.enable();
  }

  public salvar(): void {
    if (!this.especialidadeForm.valid) {
      return;
    }

    this.especialidade.nome = this.especialidadeForm.value.nome;
    this.especialidade.descricao = this.especialidadeForm.value.descricao;

    if (this.id) {
      this.especialidade.id = this.id;
      this.atualizar(this.especialidade);
      return;
    }

    this.cadastrar(this.especialidade);
    this.especialidadeForm.reset();
  }

  public deletar(id: number): void {
    this.especialidadeService.delete(id).subscribe({
      next: () => {
        this.router.navigate(['especialidade']);
      },
      error: (err) => {
        this.mostrarAlerta(`Erro: ${err.error.message}`, false);
      }
    });
  }

  private cadastrar(especialidade: Especialidade): void {
    this.especialidadeService.create(especialidade).subscribe({
      next: (especialidade) => {
        this.mostrarAlerta(`Especialidade ${especialidade.nome} cadastrada com sucesso!`, true);
      },
      error: (err) => {
        console.log(err);
        this.mostrarAlerta(`Erro: ${err.error.message}`, false);
      }
    });
  }

  private atualizar(especialidade: Especialidade): void {
    this.especialidadeService.update(especialidade).subscribe({
      next: (especialidade) => {
        this.mostrarAlerta(`Especialidade ${especialidade.nome} atualizada com sucesso!`, true);
        this.editMode = false;
        this.especialidadeForm.disable();
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
