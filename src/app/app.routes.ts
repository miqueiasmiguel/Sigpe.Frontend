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
import { authGuard } from './guards/auth.guard';
import { hasRoleGuard } from './guards/has-role.guard';
import { TipoUsuarioEnum } from './enums/tipo-usuario.enum';
import { AgendamentoListaComponent } from './modules/agendamento-lista/agendamento-lista.component';
import { AgendamentoComponent } from './modules/agendamento/agendamento.component';
import { PrescricaoListaComponent } from './modules/prescricao-lista/prescricao-lista.component';
import { PrescricaoComponent } from './modules/prescricao/prescricao.component';
import { PacientePerfilComponent } from './modules/paciente-perfil/paciente-perfil.component';

export const routes: Routes = [
  { path: '',
    component: AgendamentoListaComponent,
    children: [
      { path: '', redirectTo: 'agendamento', pathMatch: 'full' },
    ],
    canMatch: [authGuard]
  },

  { path: 'agendamento', component: AgendamentoListaComponent, canMatch: [authGuard] },
  { path: 'agendamento/novo', component: AgendamentoComponent, canMatch: [authGuard] },
  { path: 'agendamento/:id', component: AgendamentoComponent, canMatch: [authGuard] },

  { path: 'medicamento', component: MedicamentoListaComponent, canMatch: [authGuard] },
  { path: 'medicamento/novo', component: MedicamentoComponent, canMatch: [authGuard] },
  { path: 'medicamento/:id', component: MedicamentoComponent, canMatch: [authGuard] },

  { path: 'especialidade', component: EspecialidadeListaComponent, canMatch: [authGuard] },
  { path: 'especialidade/novo', component: EspecialidadeComponent, canMatch: [authGuard] },
  { path: 'especialidade/:id', component: EspecialidadeComponent, canMatch: [authGuard] },

  { path: 'plano-saude', component: PlanoSaudeListaComponent, canMatch: [authGuard] },
  { path: 'plano-saude/novo', component: PlanoSaudeComponent, canMatch: [authGuard] },
  { path: 'plano-saude/:id', component: PlanoSaudeComponent, canMatch: [authGuard] },

  { path: 'prescricao', component: PrescricaoListaComponent, canMatch: [authGuard] },
  { path: 'prescricao/novo', component: PrescricaoComponent, canMatch: [authGuard] },
  { path: 'prescricao/:id', component: PrescricaoComponent, canMatch: [authGuard] },

  { path: 'medico', component: MedicoListaComponent, canMatch: [authGuard] },
  { path: 'medico/cadastro', component: MedicoCadastroComponent, canMatch: [authGuard] },
  { path: 'medico/cadastro/:id', component: MedicoCadastroComponent, canMatch: [authGuard] },

  { path: 'paciente', component: PacienteListaComponent, canMatch: [authGuard] },
  { path: 'paciente/perfil/:id', component: PacientePerfilComponent, canMatch: [authGuard] },
  { path: 'paciente/cadastro', component: PacienteCadastroComponent, canMatch: [authGuard] },
  { path: 'paciente/cadastro/:id', component: PacienteCadastroComponent, canMatch: [authGuard] },

  { path: 'usuario', component: UsuarioListaComponent, canMatch: [authGuard] },
  { path: 'usuario/cadastro', component: UsuarioCadastroComponent, canMatch: [authGuard] },
  { path: 'usuario/cadastro/:id', component: UsuarioCadastroComponent, canMatch: [authGuard] },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
];
