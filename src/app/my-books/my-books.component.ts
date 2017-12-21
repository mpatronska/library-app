import { Component, OnInit } from '@angular/core';
import { MyBookService } from './my-book.service';
import { BookService } from '../books/book.service';
import { AuthService } from '../authentication/auth.service';
import { BookModel } from '../books/model/book.model';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {

  myBooks: BookModel[] = [];
  selectedBook: BookModel;
  hideme=[];

  constructor(private myBookService: MyBookService, private bookService: BookService, private authService: AuthService) { }

  ngOnInit() {
    this.myBookService.getMyBooks()
      .subscribe(myBooks => {
        for (let book of myBooks) {
          this.bookService.getBook(book.book_id)
            .subscribe(data => {
              this.myBooks.push(data);
              console.log(this.myBooks);
            })
        }
      })
  }

  // addToMyBooks(book: any): void {
  //   console.log('here')
  //   this.myBookService.addToMyBooks(book._id)
  //     .subscribe(e=> {
  //       console.log(e);
  //     });      
  // }

  showStatus(book: BookModel) {
    this.selectedBook = book;
  }

}
