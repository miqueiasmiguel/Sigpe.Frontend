import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Agendamento } from '../models/agendamento.interface';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  endpointBase: string = `${environment.API_URL}Agendamento`;;
  private http = inject(HttpClient);

  public get(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(this.endpointBase);
  }

  public getById(id: number): Observable<Agendamento> {
    return this.http.get<Agendamento>(`${this.endpointBase}/${id}`);
  }

  public getByMedicoId(id: number): Observable<Agendamento> {
    return this.http.get<Agendamento>(`${this.endpointBase}/Medico/${id}`);
  }

  public getByPacienteId(id: number): Observable<Agendamento> {
    return this.http.get<Agendamento>(`${this.endpointBase}/Paciente/${id}`);
  }

  public create(entidade: Agendamento): Observable<Agendamento> {
    return this.http.post<Agendamento>(this.endpointBase, entidade);
  }

  public update(entidade: Agendamento): Observable<Agendamento> {
    return this.http.put<Agendamento>(this.endpointBase, entidade);
  }

  public delete(id: number) {
    return this.http.delete(`${this.endpointBase}/${id}`);
  }
}
