import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  endpointBase: string = `${environment.API_URL}Usuario`;;
  private http = inject(HttpClient);

  public get(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.endpointBase);
  }

  public getById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.endpointBase}/${id}`);
  }

  public create(entidade: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.endpointBase, entidade);
  }

  public update(entidade: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this.endpointBase, entidade);
  }

  public delete(id: number) {
    return this.http.delete(`${this.endpointBase}/${id}`);
  }
}
