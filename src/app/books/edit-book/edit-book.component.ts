import { Component, OnInit, Input } from '@angular/core';
import { BookModel } from '../model/book.model';
import { BookService } from '../book.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  id: string;
  @Input() model: BookModel;
  public editBookSuccess: boolean
  public editBookFail: boolean;

  constructor(private bookService: BookService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
      
    this.model = new BookModel("", "", "", "", "");
  }

  editBook() : void {
    this.bookService.editBook(this.id, this.model)
      .subscribe(
        data => {
          this.editBookSuccess = true;
          console.log('success: ' + data);
        },
        err => {
          this.editBookFail = true;
          console.log('fail: ' + JSON.stringify(err));
        }
      )
  }

}
