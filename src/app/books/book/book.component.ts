import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { AuthService } from '../../authentication/auth.service';
import { CommentService } from '../../comments/comment.service';
import { BookModel } from '../model/book.model';
import { CommentModel } from '../../comments/model/comment.model';
import { Router } from '@angular/router';
import { FilterNamePipe } from '../pipes/filter-name.pipe';
import { PagerService } from '../pager.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  public books: BookModel[];
  public comments: CommentModel[];
  selectedBook: BookModel;
  hideme = [];
  hideComments = [];
  pager: any = {};
  pagedItems: any[];
  
  onSelect(book: any): void {
    this.selectedBook = book;    
  }

  constructor(
    private bookService: BookService, 
    private authService: AuthService, 
    private commentService: CommentService,
    private pagerService: PagerService,
    private router: Router,
    private toastr: ToastsManager) { }

  ngOnInit() {
    this.bookService.getBooks()
      .subscribe(books => {
        console.log(books);
        this.books = books;
        this.setPage(1);
      });
    
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
    this.pager = this.pagerService.getPager(this.books.length, page);

    // get current page of items
    this.pagedItems = this.books.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  getBook(id: string) {
    this.router.navigate([`/book/${id}`]);
  }

  addToMyBooks(book: any): void {
    this.bookService.addToMyBooks(book._id)
      .subscribe(data => {
        this.toastr.success('Successfully added book to MyBooks.', 'Success!');
      },
      err => {
        this.toastr.error('Problem adding book to MyBooks.', 'Oops!');
      });
  }

  editBook(id: string) {
    this.router.navigate(['/books/edit/' + id])
  }

  deleteBook(id: string) {
    this.bookService.deleteBook(id)
      .subscribe(data => {     
        
        this.toastr.warning('Successfully deleted book.', 'Success!');

        this.bookService.getBooks()
          .subscribe(books => {
            this.books = books;

            this.pager = this.pagerService.getPager(this.books.length, this.pager.currentPage);
            this.pagedItems = this.books.slice(this.pager.startIndex, this.pager.endIndex + 1);
          });        
      },
      err => {
        this.toastr.error('Problem deleting book.', 'Oops!');
      });

      this.bookService.deleteMyBook(id)
        .subscribe(data => {});

  }

  addComment(book: any): void {
    this.router.navigate(['/books/comment/' + book._id]);
  }

  getCommentsCountByBookId(bookId: string): number {
    let count = 0;
    let comments = [];
    this.commentService.getCommentsCountByBookId(bookId)
      .subscribe(data => {
        comments.push(data);
        count = comments.length;
      });
    
    return count;
  }

  deleteComment(commentId: string): void {
    this.commentService.deleteComment(commentId)
      .subscribe(data => {

        this.toastr.warning('Successfully deleted comment.', 'Success!');
        
        this.commentService.getComments()
        .subscribe(comments => {
          console.log(comments);
          this.comments = comments;
        })
      },
      err => {
        this.toastr.error('Problem deleting comment.', 'Oops!');
      })
  }

}
