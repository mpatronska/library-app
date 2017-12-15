import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_KEY } from '../authentication/auth.service';
import { APP_SECRET } from '../authentication/auth.service';
const MYBOOKS_URL = `https://baas.kinvey.com/appdata/${APP_KEY}/mybooks`;

@Injectable()
export class MyBookService {

  constructor(private httpClient : HttpClient, ) { }

  getMyBooks(): Observable<any> {
    return this.httpClient.get(MYBOOKS_URL,      
      { 
        headers: {
          'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
          'Content-Type': 'application/json'
        }
      }
    )
  }

  addToMyBooks(id: string): Observable<any> {
    return this.httpClient.post(MYBOOKS_URL,
      {id},      
      { 
        headers: {
          'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
          'Content-Type': 'application/json'
        }
      }
    )
  }

}
