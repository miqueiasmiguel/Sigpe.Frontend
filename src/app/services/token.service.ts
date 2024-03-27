import { Injectable, inject } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Login } from "../models/login.interface";
import { Observable } from "rxjs";
import * as jwt_decode from 'jwt-decode';
import { JwtToken } from "../models/jwt-token.interface";
import { TipoUsuarioEnum } from "../enums/tipo-usuario.enum";

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private endpointBase: string = `${environment.API_URL}Token`;;
  private http = inject(HttpClient);

  public login(login: Login): Observable<JwtToken> {
    return this.http.post<JwtToken>(this.endpointBase, login);
  }

  public logout(): void {
    localStorage.clear();
  }

  public getAuthorizationToken(): string | undefined | null {

    return window.localStorage.getItem('jwtToken');;
  }

  public getExpirationDate(token: string): Date {
    const decoded: any = jwt_decode.jwtDecode(token);
    const date = new Date(0);

    if (decoded.exp === undefined) return date;

    date.setUTCSeconds(decoded.exp);
    return date;
  }

  public getUserRole(): TipoUsuarioEnum | null {
    const token = this.getAuthorizationToken();

    if (!token) return null;
    const decoded: any = jwt_decode.jwtDecode(token);

    return parseInt(decoded.Tipo)
  }

  getPessoaId(): number | null {
    const token = this.getAuthorizationToken();

    if (!token) return null;
    const decoded: any = jwt_decode.jwtDecode(token);
    return Number(decoded.PessoaId);
  }

  public getUserId(): number | null {
    const token = this.getAuthorizationToken();

    if (!token) return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded: any = jwt_decode.jwtDecode(token);
    return parseInt(decoded.Id);
  }

  private isTokenExpired(token?: string): boolean {
    if (!token) return true;

    const date = this.getExpirationDate(token);
    if (date === undefined) return false;

    return !(date.valueOf() > new Date().valueOf());
  }

  public isUserLoggedId(): boolean {
    const token = this.getAuthorizationToken();

    if (!token) return false;
    else if (this.isTokenExpired(token)) return false;

    return true;
  }

  public isUserAuthorized(requestedRole: TipoUsuarioEnum): boolean {
    const token = this.getAuthorizationToken();
    if (!token) return false;

    const userRole = this.getUserRole();
    return userRole == requestedRole;
  }
}
