import { Component, Input, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MedicamentoService } from '../../services/medicamento.service';
import { Medicamento } from '../../models/medicamento.interface';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-medicamento',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './medicamento.component.html',
  styleUrl: './medicamento.component.scss'
})
export class MedicamentoComponent implements OnInit {
  @Input() id?: number;
  private medicamentoService = inject(MedicamentoService);
  private router = inject(Router);

  private medicamento: Medicamento = { nome: '' };

  public editMode: boolean = false;

  public showAlert: boolean = false;
  public alertClass: string = '';
  public alertMessage: string = '';

  form: FormGroup = new FormGroup({
    nome: new FormControl(''),
  });

  ngOnInit(): void {
    this.inicializaFormulario();
  }

  private inicializaFormulario(): void {
    if (this.id) {
      this.medicamentoService.getById(this.id).subscribe((medicamento) => {
        this.form.patchValue({
          nome: medicamento.nome
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

    this.medicamento.nome = this.form.value.nome;

    if (this.id) {
      this.medicamento.id = this.id;
      this.atualizar(this.medicamento);
      return;
    }

    this.cadastrar(this.medicamento);
    this.form.reset();
  }

  public deletar(id: number): void {
    this.medicamentoService.delete(id).subscribe({
      next: () => {
        this.router.navigate(['medicamento']);
      },
      error: (err) => {
        this.mostrarAlerta(`Erro: ${err.error.message}`, false);
      }
    });
  }

  private cadastrar(medicamento: Medicamento): void {
    this.medicamentoService.create(medicamento).subscribe({
      next: (medicamento) => {
        this.mostrarAlerta(`Medicamento ${medicamento.nome} cadastrado com sucesso!`, true);
      },
      error: (err) => {
        this.mostrarAlerta(`Erro: ${err.error.message}`, false);
      }
    });
  }

  private atualizar(medicamento: Medicamento): void {
    this.medicamentoService.update(medicamento).subscribe({
      next: (medicamento) => {
        this.mostrarAlerta(`Medicamento ${medicamento.nome} atualizado com sucesso!`, true);
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
