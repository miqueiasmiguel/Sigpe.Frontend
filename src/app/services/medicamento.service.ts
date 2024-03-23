import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Medicamento } from '../models/medicamento.interface';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {
  endpointBase: string = `${environment.API_URL}Medicamento`;;
  private http = inject(HttpClient);

  public get(): Observable<Medicamento[]> {
    return this.http.get<Medicamento[]>(this.endpointBase);
  }

  public getById(id: number): Observable<Medicamento> {
    return this.http.get<Medicamento>(`${this.endpointBase}/${id}`);
  }

  public create(medicamento: Medicamento): Observable<Medicamento> {
    return this.http.post<Medicamento>(this.endpointBase, medicamento);
  }

  public update(medicamento: Medicamento): Observable<Medicamento> {
    return this.http.put<Medicamento>(this.endpointBase, medicamento);
  }

  public delete(id: number) {
    return this.http.delete(`${this.endpointBase}/${id}`);
  }
}
