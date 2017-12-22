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
        user_id: localStorage.getItem('user_id')
      },    
      { 
        headers: {
          'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
          'Content-Type': 'application/json'
        }
      }
    )
  }
}
