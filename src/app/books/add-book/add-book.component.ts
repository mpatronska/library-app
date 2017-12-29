import { Component, OnInit } from '@angular/core';
import { BookModel } from '../model/book.model';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  public model: BookModel;
  public addedBook: string;
  categories = ["Classic", "Fantasy", "Biography", "Mythology", "Essay", "Philosophy", "Poetry"];
  category: string = "";

  constructor(private bookService: BookService, private router : Router, private toastr: ToastsManager) { }

  ngOnInit() {
    this.model = new BookModel("", "", "", "", "");
  }

  addBook() : void {
    this.model.category = this.category;
    this.bookService.addBook(this.model)
      .subscribe(
        data => {
          this.addedBook = data['name'];
          this.toastr.success('Successfully added book.', 'Success!');
        },
        err => {
          this.toastr.error('Problem adding book.', 'Oops!');
        }
      )
  }

}
