import { Component, OnInit, EventEmitter, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('myCanvas') myCanvas: ElementRef;
  public context: CanvasRenderingContext2D;  

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

  ngAfterViewInit(): void {
    let canvas = this.myCanvas.nativeElement;
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
    let image = new Image();
    image.src = 'http://enadcity.org/enadcity/wp-content/uploads/2017/02/profile-pictures.png';
    image.onload = () => {
      canvas.height = image.height;
      canvas.width = image.width;
      this.context.drawImage(image, 0, 0);
    }
  }    

}
