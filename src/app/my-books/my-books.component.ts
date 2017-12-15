import { Component, OnInit } from '@angular/core';
import { MyBookService } from './my-book.service';
import { BookModel } from '../books/model/book.model';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {

  myBooks: BookModel[];

  constructor(private myBookService: MyBookService) { }

  ngOnInit() {
    this.myBookService.getMyBooks()
      .subscribe(myBooks => {
        this.myBooks = myBooks;
      })
  }

  addToMyBooks(book: BookModel): void {
    console.log('here')
    this.myBookService.addToMyBooks(book.id)
      .subscribe(e=> {
        console.log(e);
      });      
  }

}
