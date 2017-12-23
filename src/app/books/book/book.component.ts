import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { AuthService } from '../../authentication/auth.service';
import { CommentService } from '../../comments/comment.service';
import { BookModel } from '../model/book.model';
import { CommentModel } from '../../comments/model/comment.model';
import { Router } from '@angular/router';

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
  
  onSelect(book: any): void {
    this.selectedBook = book;    
  }

  constructor(
    private bookService: BookService, 
    private authService: AuthService, 
    private commentService: CommentService,
    private router: Router) { }

  ngOnInit() {
    this.bookService.getBooks()
      .subscribe(books => {
        console.log(books);
        this.books = books
      });
    
    this.commentService.getComments()
      .subscribe(comments => {
        console.log(comments);
        this.comments = comments;
      })
  }

  getBook(id: string) {
    console.log("getBook:" + id);
    this.router.navigate([`/book/${id}`]);
  }

  addToMyBooks(book: any): void {
    this.bookService.addToMyBooks(book._id)
      .subscribe(data => console.log(data));
  }

  editBook(id: string) {
    this.router.navigate(['/books/edit/' + id])
  }

  deleteBook(id: string) {
    this.bookService.deleteBook(id)
      .subscribe(data => {        

        this.bookService.getBooks()
          .subscribe(books => {
            console.log(books);
            this.books = books
          });        
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
        console.log("getCommentsCountByBookId: " + comments)
        count = comments.length;
      });
    
    return count;
  }

  deleteComment(commentId: string): void {
    this.commentService.deleteComment(commentId)
      .subscribe(data => {
        
        this.commentService.getComments()
        .subscribe(comments => {
          console.log(comments);
          this.comments = comments;
        })
      })
  }

}
