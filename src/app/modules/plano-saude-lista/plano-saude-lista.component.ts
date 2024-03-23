import { Component, OnInit, inject } from '@angular/core';
import { PlanoSaudeService } from '../../services/plano-saude.service';
import { PlanoSaude } from '../../models/plano-saude.interface';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-plano-saude-lista',
  standalone: true,
  imports: [RouterLink, NavbarComponent],
  templateUrl: './plano-saude-lista.component.html',
  styleUrl: './plano-saude-lista.component.scss'
})
export class PlanoSaudeListaComponent implements OnInit {
  private planoSaudeService = inject(PlanoSaudeService);
  planosSaude: PlanoSaude[] = [];

  ngOnInit(): void {
    this.alimentarLista();
  }

  private alimentarLista() {
    this.planoSaudeService.get().subscribe((response) => {
      this.planosSaude = response;
    })
  }
}
