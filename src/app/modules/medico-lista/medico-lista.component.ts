import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { MedicoService } from '../../services/medico.service';
import { Medico } from '../../models/medico.interface';

@Component({
  selector: 'app-medico-lista',
  standalone: true,
  imports: [RouterLink, NavbarComponent],
  templateUrl: './medico-lista.component.html',
  styleUrl: './medico-lista.component.scss'
})
export class MedicoListaComponent implements OnInit {
  private medicoService = inject(MedicoService);
  public medicos: Medico[] = []

  public ngOnInit(): void {
    this.alimentarLista();
  }

  private alimentarLista() {
    this.medicoService.get().subscribe((response) => {
      this.medicos = response;
    });
  }
}
