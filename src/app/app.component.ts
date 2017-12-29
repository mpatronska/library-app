import { Component, ViewContainerRef } from '@angular/core';
import { AuthService } from './authentication/auth.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Online Library';
  
  constructor(
    private authService : AuthService,
    private toastr: ToastsManager,
    private vRef: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vRef);
    }

}
