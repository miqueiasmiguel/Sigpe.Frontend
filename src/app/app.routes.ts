import { Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { MedicamentoComponent } from './modules/medicamento/medicamento.component';
import { MedicamentoListaComponent } from './modules/medicamento-lista/medicamento-lista.component';
import { EspecialidadeComponent } from './modules/especialidade/especialidade.component';
import { EspecialidadeListaComponent } from './modules/especialidade-lista/especialidade-lista.component';
import { PlanoSaudeListaComponent } from './modules/plano-saude-lista/plano-saude-lista.component';
import { PlanoSaudeComponent } from './modules/plano-saude/plano-saude.component';
import { MedicoListaComponent } from './modules/medico-lista/medico-lista.component';
import { MedicoCadastroComponent } from './modules/medico-cadastro/medico-cadastro.component';
import { PacienteListaComponent } from './modules/paciente-lista/paciente-lista.component';
import { PacienteCadastroComponent } from './modules/paciente-cadastro/paciente-cadastro.component';
import { UsuarioListaComponent } from './modules/usuario-lista/usuario-lista.component';
import { UsuarioCadastroComponent } from './modules/usuario-cadastro/usuario-cadastro.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  { path: 'medicamento', component: MedicamentoListaComponent },
  { path: 'medicamento/novo', component: MedicamentoComponent },
  { path: 'medicamento/:id', component: MedicamentoComponent },

  { path: 'especialidade', component: EspecialidadeListaComponent },
  { path: 'especialidade/novo', component: EspecialidadeComponent },
  { path: 'especialidade/:id', component: EspecialidadeComponent },

  { path: 'plano-saude', component: PlanoSaudeListaComponent },
  { path: 'plano-saude/novo', component: PlanoSaudeComponent },
  { path: 'plano-saude/:id', component: PlanoSaudeComponent },

  { path: 'medico', component: MedicoListaComponent },
  { path: 'medico/cadastro', component: MedicoCadastroComponent },
  { path: 'medico/cadastro/:id', component: MedicoCadastroComponent },

  { path: 'paciente', component: PacienteListaComponent },
  { path: 'paciente/cadastro', component: PacienteCadastroComponent },
  { path: 'paciente/cadastro/:id', component: PacienteCadastroComponent },

  { path: 'usuario', component: UsuarioListaComponent },
  { path: 'usuario/cadastro', component: UsuarioCadastroComponent },
  { path: 'usuario/cadastro/:id', component: UsuarioCadastroComponent },
];
