import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { AuthService } from '../../authentication/auth.service';
import { BookModel } from '../model/book.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  public books: BookModel[];
  selectedBook: BookModel;
  selectedId: string;
  shown: boolean;
  myBook: BookModel;
  hideme=[];
  
  onSelect(book: any): void {
    this.selectedBook = book;
    console.log(this.selectedId);
    this.shown = ! this.shown;
    if (book._id === this.selectedId) {
      this.shown = false;
    } else {
      this.shown = true;
    }

    this.selectedId = book._id;
  }

  constructor(private bookService: BookService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.bookService.getBooks()
      .subscribe(books => {
        console.log(books);
        this.books = books
      });
  }

  getBook(id: string) {
    console.log("getBook:" + id);
    this.router.navigate([`/book/${id}`]);
  }

  addToMyBooks(book: BookModel): void {
    this.myBook = book;
    this.bookService.addToMyBooks(this.myBook.id);      
  }

}
