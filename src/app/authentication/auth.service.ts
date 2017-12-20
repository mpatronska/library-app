import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RegisterModel } from './model/register.model';
import { LoginModel } from './model/login.model';

export const APP_KEY = "kid_rJJ-HIeMM";
export const APP_SECRET = "9a16cd83a3e94dd582fd6ca3600cddd5";
const REGISTER_URL = `https://baas.kinvey.com/user/${APP_KEY}`;
const LOGIN_URL = `https://baas.kinvey.com/user/${APP_KEY}/login`;
const LOGOUT_URL = `https://baas.kinvey.com/user/${APP_KEY}/_logout`;

@Injectable()
export class AuthService {
  private currentAuthtoken : string;

  constructor(private httpClient : HttpClient) { }

  register(registerModel : RegisterModel): Observable<Object> {
    return this.httpClient.post(
      REGISTER_URL, 
      JSON.stringify(registerModel),
      { 
        headers: this.createAuthHeaders('Basic')
      }
    )
  }

  login(loginModel : LoginModel): Observable<Object> {
    return this.httpClient.post(
      LOGIN_URL,
      JSON.stringify(loginModel),
      {
        headers: this.createAuthHeaders('Basic')
      }
    )
  }

  logout(): Observable<Object> {
    return this.httpClient.post(
      LOGOUT_URL,
      {},
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  private createAuthHeaders(type: string): HttpHeaders {
    if (type === 'Basic') {
      return new HttpHeaders({
        'Authorization': `Basic ${btoa(`${APP_KEY}:${APP_SECRET}`)}`,
        'Content-Type': 'application/json'
      })
    } else {
      return new HttpHeaders({
        'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
        'Content-Type': 'application/json'
      })
    }
  }

  isLoggedIn(): boolean {
    let authtoken: string = localStorage.getItem('authtoken');
    return authtoken === this.currentAuthtoken;
  }

  //only admin has role
  isAdmin(): boolean {
    let role: string = localStorage.getItem('role');
    return role === 'admin'; 
  }

  get authtoken(): string {
    return this.currentAuthtoken;
  }

  set authtoken(value: string) {
    this.currentAuthtoken = value;
  }

}
