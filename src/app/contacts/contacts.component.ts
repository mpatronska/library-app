import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  lat: number = 42.666775;
  lng: number = 23.350083;

  constructor() { }

  ngOnInit() {
  }

}
