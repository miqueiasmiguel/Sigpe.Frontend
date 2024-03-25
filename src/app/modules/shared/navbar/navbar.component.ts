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

  ngOnInit(): void {
    const tipoUsuario = this.tokenService.getUserRole()
    this.alimentarNavbar(tipoUsuario);
  }

  private alimentarNavbar(tipoUsuario: TipoUsuarioEnum | null): void {
    if (tipoUsuario == TipoUsuarioEnum.PACIENTE) {
      this.navItems = [
        { display: 'Agendamentos', rota: '/agendamento' },
        { display: 'Prescrições', rota: '/prescricao' },
      ];
    } else if (tipoUsuario == TipoUsuarioEnum.MEDICO) {
      this.navItems = [
        { display: 'Pacientes', rota: '/paciente' },
        { display: 'Agendamentos', rota: '/agendamento' },
        { display: 'Prescrições', rota: '/prescricao' },
      ];
    } else if (tipoUsuario == TipoUsuarioEnum.RECEPCIONISTA){
      this.navItems = [
        { display: 'Pacientes', rota: '/paciente' },
        { display: 'Médicos', rota: '/medico' },
        { display: 'Usuários', rota: '/usuario' },
        { display: 'Agendamentos', rota: '/agendamento' },
        { display: 'Prescrições', rota: '/prescricao' },
      ];
    } else if (tipoUsuario == TipoUsuarioEnum.ADMINISTRADOR) {
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
