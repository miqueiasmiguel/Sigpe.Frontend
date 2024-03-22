import { Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { MedicamentoComponent } from './modules/medicamento/medicamento.component';
import { MedicamentoListaComponent } from './modules/medicamento-lista/medicamento-lista.component';

export const routes: Routes = [
  {
    path: '',
    component: MedicamentoComponent
  }
];
