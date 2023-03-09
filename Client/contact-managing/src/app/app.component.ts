import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'contact-managing';

  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [{
      label: "Contacts",
      routerLink: ['/'],
      routerLinkActiveOptions: {exact:true},
      icon: PrimeIcons.BOOK
    }, {
      label: "Add Contact",
      routerLink: ['/add'],
      routerLinkActiveOptions: {exact:true},
      icon: PrimeIcons.USER_PLUS
    }]
  }
}
