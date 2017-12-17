import { Component, OnInit } from '@angular/core';
import { BookModel } from '../model/book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  public model: BookModel;
  public addBookSuccess: boolean;
  public addBookFail: boolean;
  public addedBook: string;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.model = new BookModel("", "", "", "", "", "");
  }

  addBook() : void {
    this.bookService.addBook(this.model)
      .subscribe(
        data => {
          this.addBookSuccess = true;
          this.addedBook = data['name'];
          console.log('success: ' + data);
        },
        err => {
          this.addBookFail = true;
          console.log('fail: ' + err);
        }
      )
  }

}