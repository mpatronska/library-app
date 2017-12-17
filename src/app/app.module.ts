import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthModule } from './authentication/auth.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';

import { AuthGuard } from './guards/auth.guard';
import { BookService } from './books/book.service';
import { BookComponent } from './books/book/book.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { MyBookService } from './my-books/my-book.service';
import { AddBookComponent } from './books/add-book/add-book.component';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    MyBooksComponent,
    AddBookComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AuthModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [AuthGuard, BookService, MyBookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
