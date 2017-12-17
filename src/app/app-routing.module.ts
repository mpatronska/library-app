import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { BookComponent } from './books/book/book.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { AddBookComponent } from './books/add-book/add-book.component';

import { AuthGuard } from './guards/auth.guard';

const routes : Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'books', component: BookComponent},
  { path: 'mybooks', canActivate: [ AuthGuard ], component: MyBooksComponent },
  { path: 'books/add', canActivate: [ AuthGuard ], component: AddBookComponent },
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
