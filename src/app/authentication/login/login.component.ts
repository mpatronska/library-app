import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../model/login.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public model : LoginModel;
  public username : string;

  constructor(
    private authService : AuthService,
    private router : Router,
    private toastr: ToastsManager) { }

  ngOnInit() {
    this.model = new LoginModel("", "");
    this.username = "";
  }

  login () : void {
    this.authService.login(this.model)
      .subscribe(
        data => {
          localStorage.clear();

          this.authService.authtoken = data['_kmd']['authtoken'];
          
          localStorage.setItem('authtoken', data['_kmd']['authtoken']);
          localStorage.setItem('username', data['username']);
          localStorage.setItem('user_id', data['_id']);

          let hasRole: boolean = data['_kmd'].hasOwnProperty('roles');

          if (hasRole) {
            localStorage.setItem('role', 'admin');
          }

          this.toastr.success('Successfully logged in.', 'Success!');
          this.router.navigate(['/books']);
        },
        err => {
          this.toastr.error('Incorrect credentials. Please try again.', 'Oops!');
        }
      )
  }

}
