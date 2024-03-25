import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { PrescricaoService } from '../../services/prescricao.service';
import { Prescricao } from '../../models/prescricao.interface';

@Component({
  selector: 'app-prescricao-lista',
  standalone: true,
  imports: [RouterLink, NavbarComponent],
  templateUrl: './prescricao-lista.component.html',
  styleUrl: './prescricao-lista.component.scss'
})
export class PrescricaoListaComponent {
  private prescricaoService = inject(PrescricaoService);
  public prescricoes: Prescricao[] = [];

  ngOnInit(): void {
    this.alimentarLista();
  }

  private alimentarLista() {
    this.prescricaoService.get().subscribe((response) => {
      this.prescricoes = response;
    });
  }
}
