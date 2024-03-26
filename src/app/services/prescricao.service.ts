import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Prescricao } from '../models/prescricao.interface';

@Injectable({
  providedIn: 'root'
})
export class PrescricaoService {
  endpointBase: string = `${environment.API_URL}Prescricao`;;
  private http = inject(HttpClient);

  public get(): Observable<Prescricao[]> {
    return this.http.get<Prescricao[]>(this.endpointBase);
  }

  public getById(id: number): Observable<Prescricao> {
    return this.http.get<Prescricao>(`${this.endpointBase}/${id}`);
  }

  public getByMedicoId(id: number): Observable<Prescricao[]> {
    return this.http.get<Prescricao[]>(`${this.endpointBase}/Medico/${id}`);
  }

  public getByPacienteId(id: number): Observable<Prescricao[]> {
    return this.http.get<Prescricao[]>(`${this.endpointBase}/Paciente/${id}`);
  }

  public create(entidade: Prescricao): Observable<Prescricao> {
    return this.http.post<Prescricao>(this.endpointBase, entidade);
  }

  public update(entidade: Prescricao): Observable<Prescricao> {
    return this.http.put<Prescricao>(this.endpointBase, entidade);
  }

  public delete(id: number) {
    return this.http.delete(`${this.endpointBase}/${id}`);
  }
}
