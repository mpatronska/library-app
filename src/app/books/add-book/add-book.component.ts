import { Component, OnInit } from '@angular/core';
import { BookModel } from '../model/book.model';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

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
  categories = ["novel", "prose", "fiction"];
  category: string = "";

  constructor(private bookService: BookService, private router : Router) { }

  ngOnInit() {
    this.model = new BookModel("", "", "", "", "");
  }

  addBook(form: NgForm) : void {
    this.model.category = form.controls['category'].value;
    console.log('category: ' + this.category);
    this.bookService.addBook(this.model)
      .subscribe(
        data => {
          this.addBookSuccess = true;
          this.addedBook = data['name'];
          console.log('success: ' + data);
          // this.router.navigate(['/books']);
        },
        err => {
          this.addBookFail = true;
          console.log('fail: ' + err);
        }
      )
  }

}
