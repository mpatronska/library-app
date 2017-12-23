import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_KEY } from '../authentication/auth.service';
import { APP_SECRET } from '../authentication/auth.service';

const COMMENTS_URL = `https://baas.kinvey.com/appdata/${APP_KEY}/comments`;

@Injectable()
export class CommentService {

  constructor(private httpClient : HttpClient) { }

  addComment(bookId: string, comment: string): Observable<any> {
    return this.httpClient.post(COMMENTS_URL,
      {
        book_id: bookId,
        content: comment,
        user_id: localStorage.getItem('user_id'),
        username: localStorage.getItem('username')
      },    
      { 
        headers: {
          'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
          'Content-Type': 'application/json'
        }
      }
    )
  }

  getComments(): Observable<any> {
    return this.httpClient.get(COMMENTS_URL,        
      { 
        headers: {
          'Authorization': `Basic ${btoa(`guest:guest`)}`,
          'Content-Type': 'application/json'
        }
      }
    )
  }

  getCommentsCountByBookId(id: string): Observable<any> {
    return this.httpClient.get(COMMENTS_URL + `/?query=%7B%22book_id%22:%22${id}%22%7D`,        
      { 
        headers: {
          'Authorization': `Basic ${btoa(`guest:guest`)}`,
          'Content-Type': 'application/json'
        }
      }
    )
  }

  deleteComment(id: string): Observable<any> {
    return this.httpClient.delete(COMMENTS_URL + `/${id}`, 
    {
      headers: {
        'Authorization': `Basic ${btoa(`kid_rJJ-HIeMM:a18d9440a60740e79953a48472c688e9`)}`,
        'Content-Type': 'application/json'
      }
    });
  }
}
