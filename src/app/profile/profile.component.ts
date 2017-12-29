import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username: string;
  firstName: string;
  lastName: string;

  constructor(private router: Router, private profileSerive: ProfileService) { }

  ngOnInit() {
    this.profileSerive.getProfile()
      .subscribe(data => {
        console.log("profile: " + JSON.stringify(data));
        this.username = data['username'];
        this.firstName = data['firstName'];
        this.lastName = data['lastName'];
      })

  }

}
