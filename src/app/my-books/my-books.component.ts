import { Component, OnInit } from '@angular/core';
import { MyBookService } from './my-book.service';
import { BookService } from '../books/book.service';
import { AuthService } from '../authentication/auth.service';
import { CommentService } from '../comments/comment.service';
import { BookModel } from '../books/model/book.model';
import { CommentModel } from '../comments/model/comment.model';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { PagerService } from '../books/pager.service';

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
  pager: any = {};
  pagedItems: any[];

  constructor(
    private myBookService: MyBookService, 
    private bookService: BookService, 
    private authService: AuthService,
    private commentService: CommentService,
    private router: Router,
    private toastr: ToastsManager,
    private pagerService: PagerService) { }

  ngOnInit() {
    this.myBookService.getMyBooks()
      .subscribe(myBooks => {
        for (let book of myBooks) {
          this.bookService.getBook(book.book_id)
            .subscribe(data => {
              this.myBooks.push(data);
              this.setPage(1);
            })
        }
      })

      this.commentService.getComments()
      .subscribe(comments => {
        console.log(comments);
        this.comments = comments;
      })
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.myBooks.length, page);

    // get current page of items
    this.pagedItems = this.myBooks.slice(this.pager.startIndex, this.pager.endIndex + 1);
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
          return item._id !== bookId;
        });

        this.pager = this.pagerService.getPager(this.myBooks.length, this.pager.currentPage);
        this.pagedItems = this.myBooks.slice(this.pager.startIndex, this.pager.endIndex + 1);
        
      },
      err => {
        this.toastr.error('Problem deleting book from MyBooks.', 'Oops!');
      })
  }

}
