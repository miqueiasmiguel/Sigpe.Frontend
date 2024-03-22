import { Component } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-medicamento',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './medicamento.component.html',
  styleUrl: './medicamento.component.scss'
})
export class MedicamentoComponent {

}
