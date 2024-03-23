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
}
