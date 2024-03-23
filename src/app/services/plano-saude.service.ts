import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PlanoSaude } from '../models/plano-saude.interface';

@Injectable({
  providedIn: 'root'
})
export class PlanoSaudeService {
  endpointBase: string = `${environment.API_URL}PlanoSaude`;;
  private http = inject(HttpClient);

  public get(): Observable<PlanoSaude[]> {
    return this.http.get<PlanoSaude[]>(this.endpointBase);
  }

  public getById(id: number): Observable<PlanoSaude> {
    return this.http.get<PlanoSaude>(`${this.endpointBase}/${id}`);
  }

  public create(entidade: PlanoSaude): Observable<PlanoSaude> {
    return this.http.post<PlanoSaude>(this.endpointBase, entidade);
  }

  public update(entidade: PlanoSaude): Observable<PlanoSaude> {
    return this.http.put<PlanoSaude>(this.endpointBase, entidade);
  }

  public delete(id: number) {
    return this.http.delete(`${this.endpointBase}/${id}`);
  }
}
