import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PlanoSaudeService } from '../../services/plano-saude.service';
import { PlanoSaude } from '../../models/plano-saude.interface';

@Component({
  selector: 'app-plano-saude',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './plano-saude.component.html',
  styleUrl: './plano-saude.component.scss'
})
export class PlanoSaudeComponent implements OnInit {
  @Input() id?: number;
  private planoSaudeService = inject(PlanoSaudeService);
  private router = inject(Router);

  private planoSaude: PlanoSaude = { nome: '' };

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
      this.planoSaudeService.getById(this.id).subscribe((planoSaude) => {
        this.form.patchValue({
          nome: planoSaude.nome
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

    this.planoSaude.nome = this.form.value.nome;

    if (this.id) {
      this.planoSaude.id = this.id;
      this.atualizar(this.planoSaude);
      return;
    }

    this.cadastrar(this.planoSaude);
    this.form.reset();
  }

  public deletar(id: number): void {
    this.planoSaudeService.delete(id).subscribe({
      next: () => {
        this.router.navigate(['plano-saude']);
      },
      error: (err) => {
        this.mostrarAlerta(`Erro: ${err.error.message}`, false);
      }
    });
  }

  private cadastrar(planoSaude: PlanoSaude): void {
    this.planoSaudeService.create(planoSaude).subscribe({
      next: (planoSaude) => {
        this.mostrarAlerta(`Plano de saúde ${planoSaude.nome} cadastrado com sucesso!`, true);
      },
      error: (err) => {
        console.log(err);
        this.mostrarAlerta(`Erro: ${err.error.message}`, false);
      }
    });
  }

  private atualizar(planoSaude: PlanoSaude): void {
    this.planoSaudeService.update(planoSaude).subscribe({
      next: (planoSaude) => {
        this.mostrarAlerta(`Plano de Saúde ${planoSaude.nome} atualizado com sucesso!`, true);
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
