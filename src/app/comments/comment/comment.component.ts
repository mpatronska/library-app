import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookModel } from '../../books/model/book.model';
import { BookService } from '../../books/book.service';
import { CommentService } from '../comment.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  bookId: string;
  book: BookModel;
  @Input() comment: string;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private commentService: CommentService,
    private toastr: ToastsManager) { }

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
        this.toastr.success('Successfully added comment.', 'Success!');
      }, err => {
        this.toastr.error('Problem adding comment.', 'Oops!');
      });
  }  

}
