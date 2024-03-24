import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../models/paciente.interface';

@Component({
  selector: 'app-paciente-lista',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './paciente-lista.component.html',
  styleUrl: './paciente-lista.component.scss'
})
export class PacienteListaComponent {
  private pacienteService = inject(PacienteService);
  public pacientes: Paciente[] = [];

  public ngOnInit(): void {
    this.alimentarLista();
  }

  private alimentarLista() {
    this.pacienteService.get().subscribe((response) => {
      this.pacientes = response;
    });
  }
}
