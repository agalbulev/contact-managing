import { Component, OnInit } from '@angular/core';
import { createSelector, select, Store } from '@ngrx/store';
import { AppState } from 'src/app-store';
import { GetContacts } from '../../contacts.actions';
import { ContactsState } from '../../contacts.reducer';
import { ContactsService } from '../../services/contacts.service';

export const selectFeature = (state: AppState) => state.contactsModule;

export const selectFeatureCount = createSelector(
  selectFeature,
  (state: ContactsState) => state.isLoadingContacts
);

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  constructor(
    private contactService: ContactsService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new GetContacts());
  }

}
