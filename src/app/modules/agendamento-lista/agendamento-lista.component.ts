import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-agendamento-lista',
  standalone: true,
  imports: [RouterLink, NavbarComponent],
  templateUrl: './agendamento-lista.component.html',
  styleUrl: './agendamento-lista.component.scss'
})
export class AgendamentoListaComponent {

}
