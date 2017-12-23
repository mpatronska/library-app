import { Component } from '@angular/core';
import { AuthService } from './authentication/auth.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Online Library';
  
  constructor(private authService : AuthService) {}

}
