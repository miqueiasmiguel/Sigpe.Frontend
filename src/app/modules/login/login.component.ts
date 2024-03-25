import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Login } from '../../models/login.interface';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private tokenService = inject(TokenService);
  private router = inject(Router);

  public showAlert: boolean = false;
  public alertClass: string = '';
  public alertMessage: string = '';

  public form: FormGroup = new FormGroup({
    email: new FormControl(),
    senha: new FormControl(),
  });

  onSubmit(): void {
    if (!this.form.valid) return;

    let login: Login = {
      email: '',
      senha: '',
    };

    login.email = this.form.value.email;
    login.senha = this.form.value.senha;

    this.tokenService.login(login).subscribe({
      next: (jwtToken) => {
        localStorage.setItem('jwtToken', jwtToken.token);
        this.router.navigate(['']);
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
