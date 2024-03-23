import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Medico } from '../models/medico.interface';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  endpointBase: string = `${environment.API_URL}Medico`;;
  private http = inject(HttpClient);

  public get(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.endpointBase);
  }

  public getById(id: number): Observable<Medico> {
    return this.http.get<Medico>(`${this.endpointBase}/${id}`);
  }

  public create(entidade: Medico): Observable<Medico> {
    return this.http.post<Medico>(this.endpointBase, entidade);
  }

  public update(entidade: Medico): Observable<Medico> {
    return this.http.put<Medico>(this.endpointBase, entidade);
  }

  public delete(id: number) {
    return this.http.delete(`${this.endpointBase}/${id}`);
  }
}
