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
  hideme = [];
  hideComments = [];
  
  onSelect(book: any): void {
    this.selectedBook = book;    
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

  addToMyBooks(book: any): void {
    this.bookService.addToMyBooks(book._id)
      .subscribe(data => console.log(data));
    console.log('here')    
  }

  editBook(id: string) {
    this.router.navigate(['/books/edit/' + id])
  }

}
