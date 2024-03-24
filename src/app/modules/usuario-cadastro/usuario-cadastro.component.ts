import { TipoUsuarioEnum } from './../../enums/tipo-usuario.enum';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { PacienteService } from '../../services/paciente.service';
import { MedicoService } from '../../services/medico.service';
import { Usuario } from '../../models/usuario.interface';
import { Pessoa } from '../../models/pessoa.interface';

@Component({
  selector: 'app-usuario-cadastro',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './usuario-cadastro.component.html',
  styleUrl: './usuario-cadastro.component.scss'
})
export class UsuarioCadastroComponent implements OnInit {
  @Input() id?: number;
  private usuarioService = inject(UsuarioService);
  private pacienteService = inject(PacienteService);
  private medicoService = inject(MedicoService);
  private router = inject(Router);

  public pessoas: Pessoa[] = [];

  public tiposUsuario = [
    { display: 'Administrador', value: TipoUsuarioEnum.ADMINISTRADOR },
    { display: 'Médico', value: TipoUsuarioEnum.MEDICO },
    { display: 'Paciente', value: TipoUsuarioEnum.PACIENTE },
    { display: 'Recepcionista', value: TipoUsuarioEnum.RECEPCIONISTA },
  ];

  private usuario: Usuario = {
    email: '',
    senha: '',
    pessoaId: 0,
    tipoUsuario: 0
  }

  public editMode: boolean = false;

  public showAlert: boolean = false;
  public alertClass: string = '';
  public alertMessage: string = '';

  form: FormGroup = new FormGroup({
    email: new FormControl(),
    senha: new FormControl(),
    pessoaId: new FormControl(),
    tipoUsuario: new FormControl(),
  });

  ngOnInit(): void {
    this.inicializaFormulario();
  }

  private inicializaFormulario(): void {
    if (this.id) {
      this.usuarioService.getById(this.id).subscribe((usuario) => {
        this.carregarPessoas(usuario.tipoUsuario);
        this.form.patchValue({
          email: usuario.email,
          senha: usuario.senha,
          pessoaId: usuario.pessoaId,
          tipoUsuario: usuario.tipoUsuario
        });
      })

      this.form.disable();
    }

    this.form.controls['pessoaId'].disable();
  }

  public editar(): void {
    this.editMode = true;
    this.form.enable();
    this.verificarTipoUsuarioSelecionado(parseInt(this.form.value.tipoUsuario));
  }

  public salvar(): void {
    if (!this.form.valid) {
      return;
    }

    this.usuario.email = this.form.value.email;
    this.usuario.senha = this.form.value.senha;
    this.usuario.pessoaId = parseInt(this.form.value.pessoaId);
    this.usuario.tipoUsuario = parseInt(this.form.value.tipoUsuario);

    if (this.id) {
      this.usuario.id = this.id;
      this.atualizar(this.usuario);
      return;
    }

    this.cadastrar(this.usuario);
    this.form.reset();
  }

  public deletar(id: number): void {
    this.usuarioService.delete(id).subscribe({
      next: () => {
        this.router.navigate(['usuario']);
      },
      error: (err) => {
        this.mostrarAlerta(`Erro: ${err.error.message}`, false);
      }
    });
  }

  private cadastrar(usuario: Usuario): void {
    this.usuarioService.create(usuario).subscribe({
      next: (usuario) => {
        this.mostrarAlerta(`Usuário ${usuario.email} cadastrado com sucesso!`, true);
      },
      error: (err) => {
        console.log(err);
        this.mostrarAlerta(`Erro: ${err.error.message}`, false);
      }
    });
  }

  private atualizar(usuario: Usuario): void {
    this.usuarioService.update(usuario).subscribe({
      next: (usuario) => {
        this.mostrarAlerta(`Usuário ${usuario.email} atualizado com sucesso!`, true);
        this.editMode = false;
        this.form.disable();
      },
      error: (err) => {
        this.mostrarAlerta(`Erro: ${err.error.message}`, false);
      }
    });
  }

  private carregarPacientes(): void {
    this.pacienteService.get().subscribe({
      next: (pacientes) => {
        pacientes.forEach(paciente => {
          let pessoa: Pessoa = { id: paciente.id, nome: paciente.nome};

          this.pessoas.push(pessoa);
        })
      },
      error: (err) => {
        this.mostrarAlerta(`Erro: ${err.error.message}`, false);
      }
    })
  }

  private carregarMedicos(): void {
    this.medicoService.get().subscribe({
      next: (medicos) => {
        medicos.forEach(medico => {
          let pessoa: Pessoa = { id: medico.id, nome: medico.nome};

          this.pessoas.push(pessoa);
        })
      },
      error: (err) => {
        this.mostrarAlerta(`Erro: ${err.error.message}`, false);
      }
    })
  }

  private mostrarAlerta(mensagem: string, isSuccess: boolean) {
    this.alertClass = isSuccess ? 'alert-success' : 'alert-danger';
    this.alertMessage = mensagem;
    this.showAlert = true;
  }

  public onTipoChange(event: any): void {
    const tipoUsuarioSelecionado = parseInt(this.form.value.tipoUsuario);

    this.verificarTipoUsuarioSelecionado(tipoUsuarioSelecionado);
    this.carregarPessoas(tipoUsuarioSelecionado);
  }

  private carregarPessoas(tipoUsuarioSelecionado: number): void {
    this.pessoas = [];

    if (tipoUsuarioSelecionado == TipoUsuarioEnum.PACIENTE) {
      this.carregarPacientes();
    } else if (tipoUsuarioSelecionado == TipoUsuarioEnum.MEDICO) {
      this.carregarMedicos();
    }
  }

  private verificarTipoUsuarioSelecionado(tipoUsuarioSelecionado: number): void {
    if (![TipoUsuarioEnum.MEDICO, TipoUsuarioEnum.PACIENTE].includes(tipoUsuarioSelecionado)) {
      this.form.controls['pessoaId'].disable();
      this.form.controls['pessoaId'].setValue('');
    } else {
      this.form.controls['pessoaId'].enable();
    }
  }
}
