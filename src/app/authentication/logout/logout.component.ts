import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService : AuthService,
    private router : Router,
    private toastr: ToastsManager) { }

  ngOnInit() {
    this.authService.logout()
      .subscribe(data => {
        localStorage.clear();
        this.toastr.success('Successfully logout.', 'Success!');
        this.router.navigate(['/books']);
      })
  }

}
