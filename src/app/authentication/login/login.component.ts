import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../model/login.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public model : LoginModel;
  public loginFail : boolean;
  public username : string;

  constructor(
    private authService : AuthService,
    private router : Router) { }

  ngOnInit() {
    this.model = new LoginModel("", "");
    this.username = "";
  }

  login () : void {
    this.authService.login(this.model)
      .subscribe(
        data => {
          console.log("login-data: " + JSON.stringify(data));
          console.log("role on login: " + localStorage.getItem('role'))
          this.authService.authtoken = data['_kmd']['authtoken'];
          localStorage.setItem('authtoken', data['_kmd']['authtoken']);
          localStorage.setItem('username', data['username']);
          let hasRole: boolean = data['_kmd'].hasOwnProperty('roles');
          console.log('hasRole: ' + hasRole);
          if (hasRole) {
            localStorage.setItem('role', 'admin');
          }
          console.log('role:' + localStorage.getItem('role'));
          this.loginFail = false;
          this.router.navigate(['/books']);
        },
        err => {
          this.loginFail = true;
        }
      )
  }

}
