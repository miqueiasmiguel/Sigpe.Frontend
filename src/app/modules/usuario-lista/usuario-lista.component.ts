import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.interface';
import { TipoUsuarioEnum } from '../../enums/tipo-usuario.enum';

@Component({
  selector: 'app-usuario-lista',
  standalone: true,
  imports: [RouterLink, NavbarComponent],
  templateUrl: './usuario-lista.component.html',
  styleUrl: './usuario-lista.component.scss'
})
export class UsuarioListaComponent {
  private usuarioService = inject(UsuarioService);
  public usuarios: Usuario[] = [];

  ngOnInit(): void {
    this.alimentarLista();
  }

  private alimentarLista() {
    this.usuarioService.get().subscribe((response) => {
      this.usuarios = response;
    });
  }

  public converterTipoUsuarioParaString(tipo: number): string {
    return TipoUsuarioEnum[tipo];
  }
}
