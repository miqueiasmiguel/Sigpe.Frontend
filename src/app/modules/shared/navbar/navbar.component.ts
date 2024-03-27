import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TokenService } from '../../../services/token.service';
import { TipoUsuarioEnum } from '../../../enums/tipo-usuario.enum';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  private tokenService = inject(TokenService);
  private router = inject(Router);

  public navItems = [{ display: '', rota: '' }];
  public btnPerfil = { mostrar: true, rota: '' };
  private tipoUsuario: TipoUsuarioEnum | null = null;
  private id: number | null = null;

  ngOnInit(): void {
    this.tipoUsuario = this.tokenService.getUserRole();
    this.id = this.tokenService.getPessoaId();

    this.alimentarNavbar();
    this.definirBtnPerfil();
  }

  private definirBtnPerfil(): void {
    if (this.tipoUsuario == TipoUsuarioEnum.RECEPCIONISTA || this.tipoUsuario == TipoUsuarioEnum.ADMINISTRADOR) {
      this.btnPerfil.mostrar = false;
    } else if (this.tipoUsuario == TipoUsuarioEnum.PACIENTE) {
      this.btnPerfil.mostrar = true;
      this.btnPerfil.rota = `/paciente/perfil/${this.id}`;
    } else if (this.tipoUsuario == TipoUsuarioEnum.MEDICO) {
      this.btnPerfil.mostrar = true;
      this.btnPerfil.rota = `/medico/perfil/${this.id}`;
    }
  }

  private alimentarNavbar(): void {
    if (this.tipoUsuario == TipoUsuarioEnum.PACIENTE) {
      this.navItems = [
        { display: 'Agendamentos', rota: '/agendamento' },
        { display: 'Prescrições', rota: '/prescricao' },
      ];
    } else if (this.tipoUsuario == TipoUsuarioEnum.MEDICO) {
      this.navItems = [
        { display: 'Pacientes', rota: '/paciente' },
        { display: 'Agendamentos', rota: '/agendamento' },
        { display: 'Prescrições', rota: '/prescricao' },
      ];
    } else if (this.tipoUsuario == TipoUsuarioEnum.RECEPCIONISTA){
      this.navItems = [
        { display: 'Pacientes', rota: '/paciente' },
        { display: 'Médicos', rota: '/medico' },
        { display: 'Usuários', rota: '/usuario' },
        { display: 'Agendamentos', rota: '/agendamento' },
        { display: 'Prescrições', rota: '/prescricao' },
      ];
    } else if (this.tipoUsuario == TipoUsuarioEnum.ADMINISTRADOR) {
      this.navItems = [
        { display: 'Pacientes', rota: '/paciente' },
        { display: 'Médicos', rota: '/medico' },
        { display: 'Usuários', rota: '/usuario' },
        { display: 'Medicamentos', rota: '/medicamento' },
        { display: 'Especialidades', rota: '/especialidade' },
        { display: 'Planos de saúde', rota: '/plano-saude' },
        { display: 'Agendamentos', rota: '/agendamento' },
        { display: 'Prescrições', rota: '/prescricao' },
      ];
    }
  }

  public logout(): void {
    this.tokenService.logout();
    this.router.navigate(['']);
  }
}
