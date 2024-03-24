import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Paciente } from '../models/paciente.interface';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  endpointBase: string = `${environment.API_URL}Paciente`;;
  private http = inject(HttpClient);

  public get(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.endpointBase);
  }

  public getById(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.endpointBase}/${id}`);
  }

  public create(entidade: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.endpointBase, entidade);
  }

  public update(entidade: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(this.endpointBase, entidade);
  }

  public delete(id: number) {
    return this.http.delete(`${this.endpointBase}/${id}`);
  }
}
