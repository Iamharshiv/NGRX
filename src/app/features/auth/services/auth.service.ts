import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRegisterRequestInterface } from '../models/register.interface';
import { Observable, map } from 'rxjs';
import { ICurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { IAuthResponse } from '../models/authResponse.interface';
import { environment } from 'src/environments/environment.development';
import { ILoginRequestInterface } from '../models/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userUrl = environment.apiUrl + 'users';
  loginUrl = environment.apiUrl + 'users/login';
  currentUserUrl = environment.apiUrl + 'user';

  constructor(private http: HttpClient) {}
  getUser(response: IAuthResponse): ICurrentUserInterface {
    return response.user;
  }
  register(json: IRegisterRequestInterface): Observable<ICurrentUserInterface> {
    return this.http
      .post<IAuthResponse>(this.userUrl, json)
      .pipe(map(this.getUser));
  }

  login(json: ILoginRequestInterface): Observable<ICurrentUserInterface> {
    return this.http
      .post<IAuthResponse>(this.loginUrl, json)
      .pipe(map(this.getUser));
  }

  getCurrentUser(): Observable<ICurrentUserInterface> {
    return this.http
      .get<IAuthResponse>(this.currentUserUrl)
      .pipe(map(this.getUser));
  }
}
