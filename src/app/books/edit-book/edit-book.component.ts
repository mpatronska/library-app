import { Component, OnInit, Input } from '@angular/core';
import { BookModel } from '../model/book.model';
import { BookService } from '../book.service';
import { ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  id: string;
  @Input() model: BookModel;
  categories = ["Classic", "Novel", "Fantasy", "Biography", "Mythology", "Essay", "Philosophy", "Poetry"];
  category: string = "";

  constructor(
    private bookService: BookService, 
    private route: ActivatedRoute,
    private toastr: ToastsManager) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.model = new BookModel("", "", "", "", "");

    this.bookService.getBook(this.id)
      .subscribe(data => {
        this.model = data;        
    })
    
  }

  editBook() : void {
    this.bookService.editBook(this.id, this.model)
      .subscribe(
        data => {
          this.toastr.success('Successfully edited book.', 'Success!');
        },
        err => {
          this.toastr.error('Problem editing book.', 'Oops!');
        }
      )
  }

}
