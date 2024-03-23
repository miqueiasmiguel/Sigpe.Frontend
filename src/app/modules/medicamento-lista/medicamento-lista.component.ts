import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { MedicamentoService } from '../../services/medicamento.service';
import { Medicamento } from '../../models/medicamento.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-medicamento-lista',
  standalone: true,
  imports: [RouterLink, NavbarComponent],
  templateUrl: './medicamento-lista.component.html',
  styleUrl: './medicamento-lista.component.scss'
})
export class MedicamentoListaComponent implements OnInit {
  private medicamentoService = inject(MedicamentoService);
  medicamentos: Medicamento[] = [];

  ngOnInit(): void {
    this.alimentarLista();
  }

  private alimentarLista() {
    this.medicamentoService.get().subscribe((response) => {
      this.medicamentos = response;
    })
  }
}
