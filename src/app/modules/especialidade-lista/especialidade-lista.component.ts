import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { Especialidade } from '../../models/especialidade.interface';
import { EspecialidadeService } from '../../services/especialidade.service';

@Component({
  selector: 'app-especialidade-lista',
  standalone: true,
  imports: [RouterLink, NavbarComponent],
  templateUrl: './especialidade-lista.component.html',
  styleUrl: './especialidade-lista.component.scss'
})
export class EspecialidadeListaComponent implements OnInit {
  private espcecialidadeService = inject(EspecialidadeService);
  especialidades: Especialidade[] = [];

  ngOnInit(): void {
    this.obterEspecialidades();
  }

  private obterEspecialidades() {
    this.espcecialidadeService.get().subscribe((response) => {
      console.log(response);
      this.especialidades = response;
    })
  }
}
