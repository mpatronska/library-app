import { Component, OnInit } from '@angular/core';
import { MyBookService } from './my-book.service';
import { BookService } from '../books/book.service';
import { AuthService } from '../authentication/auth.service';
import { CommentService } from '../comments/comment.service';
import { BookModel } from '../books/model/book.model';
import { CommentModel } from '../comments/model/comment.model';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

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
    private router: Router,
    private toastr: ToastsManager) { }

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

        this.toastr.success('Successfully deleted book from MyBooks.', 'Success!');

        this.myBooks = this.myBooks.filter(item => {
          return item._id !== bookId
        });
        
      },
      err => {
        this.toastr.error('Problem deleting book from MyBooks.', 'Oops!');
      })
  }

}
