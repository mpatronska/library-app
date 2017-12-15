import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BookModel } from './model/book.model';
import { APP_KEY } from '../authentication/auth.service';
import { APP_SECRET } from '../authentication/auth.service';

const BOOKS_URL = `https://baas.kinvey.com/appdata/${APP_KEY}/books`;
const MYBOOKS_URL = `https://baas.kinvey.com/appdata/${APP_KEY}/mybooks`;

@Injectable()
export class BookService {

  constructor(private httpClient : HttpClient) { }

  getBooks(): Observable<any> {
    return this.httpClient.get(BOOKS_URL,      
      { 
        headers: this.createAuthHeaders('Basic')
      }
    )
  }

  getBook(id: string): Observable<any> {
    return this.httpClient.get(BOOKS_URL + `/${id}`,
      { 
        headers: this.createAuthHeaders('Basic')
      }
    )
  }

  addToMyBooks(id: string): Observable<any> {
    return this.httpClient.post(MYBOOKS_URL,
      {
        username: localStorage.getItem('username'),
        book_id: id},
      { 
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  private createAuthHeaders(type: string): HttpHeaders {
    if (type === 'Basic') {
      return new HttpHeaders({
        'Authorization': `Basic ${btoa(`guest:guest`)}`,
        'Content-Type': 'application/json'
      })
    } else {
      return new HttpHeaders({
        'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
        'Content-Type': 'application/json'
      })
    }
  }
}
