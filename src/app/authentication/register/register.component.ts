import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../model/register.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public model: RegisterModel;
  public registeredUser : string;

  constructor(
    private router : Router, 
    private authService : AuthService, 
    private toastr: ToastsManager) { }

  ngOnInit() {
    this.model = new RegisterModel("", "", "", "");
  }

  register() : void {
    this.authService.register(this.model)
      .subscribe(
        data => {
          this.registeredUser = data['username'];
          this.toastr.success('Successfully registered.', 'Success!');
          this.router.navigate(['/login']);
        },
        err => {
          this.toastr.error('Problem registering user. Please try again.', 'Oops!');
        }
      )
  }

}
