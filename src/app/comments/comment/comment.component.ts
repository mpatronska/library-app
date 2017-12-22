import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookModel } from '../../books/model/book.model';
import { BookService } from '../../books/book.service';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  bookId: string;
  book: BookModel;
  @Input() comment: string;
  addCommentSuccess: boolean;
  addCommentFail: boolean;


  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private commentService: CommentService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bookId = params['bookId'];
    });

    this.book = new BookModel("", "", "", "", "");
    
    this.bookService.getBook(this.bookId)
      .subscribe(data => {
        this.book = data;        
    })

  }

  addComment(bookId: string): void {
    this.commentService.addComment(bookId, this.comment)
      .subscribe(data => {
        console.log(data);
        this.addCommentSuccess = true;
      }, err => {
        this.addCommentFail = true;
      });
  }  

}
