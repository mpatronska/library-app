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
    return this.httpClient.get(MYBOOKS_URL + `/?query=%7B%22user_id%22:%22${localStorage.getItem('user_id')}%22%7D`,      
      { 
        headers: {
          'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
          'Content-Type': 'application/json'
        }
      }
    )
  }

  getMyBook(bookId: string): Observable<any> {
    return this.httpClient.get(MYBOOKS_URL + `/?query=%7B%22book_id%22:%22${bookId}%22%7D`,      
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
      {
        "book_id": id,
        "user_id": localStorage.getItem('user_id')
      },      
      { 
        headers: {
          'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
          'Content-Type': 'application/json'
        }
      }
    )
  }

  deleteFromMyBooks(id: string): Observable<any> {
    return this.httpClient.delete(MYBOOKS_URL + `/?query=%7B%22book_id%22:%22${id}%22%7D`,      
    { 
      headers: {
        'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
        'Content-Type': 'application/json'
      }
    })
  }

}
