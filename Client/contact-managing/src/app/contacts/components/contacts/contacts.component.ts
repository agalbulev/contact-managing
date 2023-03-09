import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app-store';
import { GetContacts } from '../../contacts.actions';
import { selectContacts, selectContactsLoading } from '../../contacts.reducer';
import { IContact } from '../../services/contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  public contacts: IContact[] = <any>[{}, {}, {}];
  public isLoading$: Observable<boolean> = this.store.select(selectContactsLoading);

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select(selectContacts).subscribe(contacts => {
      if (!contacts) {
        this.store.dispatch(new GetContacts());
        return;
      }

      this.contacts = contacts;
    })
  }

}
