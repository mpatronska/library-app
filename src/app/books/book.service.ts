import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BookModel } from './model/book.model';
import { MyBookService } from '../my-books/my-book.service';
import { APP_KEY } from '../authentication/auth.service';
import { APP_SECRET } from '../authentication/auth.service';

const BOOKS_URL = `https://baas.kinvey.com/appdata/${APP_KEY}/books`;
const MYBOOKS_URL = `https://baas.kinvey.com/appdata/${APP_KEY}/mybooks`;

@Injectable()
export class BookService {
  myBooks: BookModel[] = [];

  constructor(private httpClient : HttpClient, private myBookService: MyBookService) { }

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
    // this.myBookService.getMyBooks()
    //   .subscribe(data => {
    //     this.myBooks.push(data);
    //   });

    // for (let myBook of this.myBooks) {
    //   if (myBook.id === id) {
    //     //The book is already added to MyBooks
    //   } else {
        return this.httpClient.post(MYBOOKS_URL,
          {
            user_id: localStorage.getItem('user_id'),
            book_id: id,
            status: 'Not Started'},
          { 
            headers: this.createAuthHeaders('Kinvey')
          }
        )
    //   }
    // }
    
  }

  isMyBook(id: string): boolean {
    this.httpClient.get(MYBOOKS_URL + `/?query={book_id: ${id}}`,
      { 
        headers: this.createAuthHeaders('Kinvey')
      }
    ).subscribe(data => console.log('isMyBook: ' + data));
    return true;
  }

  addBook(bookModel: BookModel): Observable<any> {
    return this.httpClient.post(BOOKS_URL,
      JSON.stringify(bookModel),    
      { 
        headers: {
          'Authorization': `Basic ${btoa(`kid_rJJ-HIeMM:a18d9440a60740e79953a48472c688e9`)}`,
          'Content-Type': 'application/json'
        }
      }
    )
  }

  //using master secret
  editBook(id, bookModel: BookModel): Observable<any> {
    console.log(id);
    return this.httpClient.put(BOOKS_URL + `/${id}`, 
    JSON.stringify(bookModel), 
    {
      headers: {
        'Authorization': `Basic ${btoa(`kid_rJJ-HIeMM:a18d9440a60740e79953a48472c688e9`)}`,
        'Content-Type': 'application/json'
      }
    });
  }

  deleteBook(id): Observable<any> {
    return this.httpClient.delete(BOOKS_URL + `/${id}`, 
      {
        headers: {
          'Authorization': `Basic ${btoa(`kid_rJJ-HIeMM:a18d9440a60740e79953a48472c688e9`)}`,
          'Content-Type': 'application/json'
        }
      });
  }

  deleteMyBook(id): Observable<any> {
    return this.httpClient.delete(MYBOOKS_URL + `/?query=%7B%22book_id%22:%22${id}%22%7D`, 
      {
        headers: {
          'Authorization': `Basic ${btoa(`kid_rJJ-HIeMM:a18d9440a60740e79953a48472c688e9`)}`,
          'Content-Type': 'application/json'
        }
      });
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
