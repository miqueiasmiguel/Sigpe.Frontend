import { Component } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-medicamento-lista',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './medicamento-lista.component.html',
  styleUrl: './medicamento-lista.component.scss'
})
export class MedicamentoListaComponent {

}
