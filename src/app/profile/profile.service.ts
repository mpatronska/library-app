import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { APP_KEY } from '../authentication/auth.service';
import { APP_SECRET } from '../authentication/auth.service';

const BOOKS_URL = `https://baas.kinvey.com/user/${APP_KEY}`;

@Injectable()
export class ProfileService {

  constructor(private httpClient : HttpClient) { }

  getProfile(): Observable<any> {
    return this.httpClient.get(BOOKS_URL + "/" + localStorage.getItem('user_id'),      
      { 
        headers: {
          'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
          'Content-Type': 'application/json'
        }
      }
    )
  }
}
