import { BrowserModule } from '@angular/platform-browser';
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

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    MyBooksComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [AuthGuard, BookService, MyBookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
