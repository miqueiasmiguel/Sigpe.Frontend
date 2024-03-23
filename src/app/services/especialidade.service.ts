import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Especialidade } from '../models/especialidade.interface';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadeService {
  endpointBase: string = `${environment.API_URL}Especialidade`;;
  private http = inject(HttpClient);

  public get(): Observable<Especialidade[]> {
    return this.http.get<Especialidade[]>(this.endpointBase);
  }

  public getById(id: number): Observable<Especialidade> {
    return this.http.get<Especialidade>(`${this.endpointBase}/${id}`);
  }

  public create(entidade: Especialidade): Observable<Especialidade> {
    return this.http.post<Especialidade>(this.endpointBase, entidade);
  }

  public update(entidade: Especialidade): Observable<Especialidade> {
    return this.http.put<Especialidade>(this.endpointBase, entidade);
  }

  public delete(id: number) {
    return this.http.delete(`${this.endpointBase}/${id}`);
  }
}
