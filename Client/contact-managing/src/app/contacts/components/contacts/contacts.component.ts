import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  constructor(
    private contactService: ContactsService
  ) { }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(response => console.log(response));
  }

}
