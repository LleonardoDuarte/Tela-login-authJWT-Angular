import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = environment.api;

  constructor(private httpCliente: HttpClient, private router: Router) {}

  public sign(payLoad: { email: string; password: string }): Observable<any> {
    return this.httpCliente
      .post<{ token: string }>(`${this.url}/sign`, payLoad)
      .pipe(
        map((res) => {
          localStorage.removeItem('access_token');
          localStorage.setItem('access_token', res.token);
          return this.router.navigate(['admin']);
        }),
        catchError((e) => {
          if (e.error.message) return throwError(() => e.error.message);

          return throwError(
            () =>
              'No momento Não estamos conseguindo validar os dados, tenta novamente mais tarde.'
          );
        })
      );
  }

  public logout() {
    localStorage.removeItem('access_token');
    return this.router.navigate(['']);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');

    if (!token) {
      return false;
    }
    const jwtHelper = new JwtHelperService();
    return !jwtHelper.isTokenExpired(token);
  }
}
