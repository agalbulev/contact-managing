import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app-store';
import { GetContacts } from '../../contacts.actions';
import { selectContacts, selectContactsLoading } from '../../contacts.reducer';
import { IContact } from '../../services/contacts.service';

interface IContactView extends IContact {
  dateOfBirthObject: Date;
}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnDestroy {

  public contacts: IContactView[] = <any>[{}, {}, {}];
  public isLoading$: Observable<boolean> = this.store.select(selectContactsLoading);

  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.store.select(selectContacts).subscribe(({ contactsLoaded, contacts }) => {
      if (!contactsLoaded) {
        this.store.dispatch(new GetContacts());
        return;
      }

      if (contactsLoaded && contacts) {
        this.contacts = contacts.map(contact => ({
          ...contact,
          dateOfBirthObject: new Date(contact.dateOfBirth)
        }));
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
