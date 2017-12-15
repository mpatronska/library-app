import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../model/register.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public model: RegisterModel;
  public registeredUser : string;
  public registerSuccess : boolean;
  public registerFail : boolean;

  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.model = new RegisterModel("", "", "", "");
  }

  register() : void {
    this.authService.register(this.model)
      .subscribe(
        data => {
          this.registerSuccess = true;
          this.registeredUser = data['username'];
        },
        err => {
          this.registerFail = true;
        }
      )
  }

}
