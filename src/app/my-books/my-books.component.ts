import { Component, OnInit } from '@angular/core';
import { MyBookService } from './my-book.service';
import { BookService } from '../books/book.service';
import { AuthService } from '../authentication/auth.service';
import { CommentService } from '../comments/comment.service';
import { BookModel } from '../books/model/book.model';
import { CommentModel } from '../comments/model/comment.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {

  myBooks: any[] = [];
  public comments: CommentModel[];
  selectedBook: BookModel;
  hideme = [];
  hideComments = [];

  constructor(
    private myBookService: MyBookService, 
    private bookService: BookService, 
    private authService: AuthService,
    private commentService: CommentService,
    private router: Router) { }

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

      this.commentService.getComments()
      .subscribe(comments => {
        console.log(comments);
        this.comments = comments;
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

  addComment(book: any): void {
    this.router.navigate(['/books/comment/' + book._id]);
  }

  deleteFromMyBooks(bookId: string): void {
    console.log("deleteFromMyBooks bookId:" + bookId);
    this.myBookService.deleteFromMyBooks(bookId)
      .subscribe(data => {

        this.myBooks = this.myBooks.filter(item => {
          return item._id !== bookId
        });
        
      })
  }

}
