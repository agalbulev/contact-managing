import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { MessageService } from "primeng/api";
import { map, mergeMap, finalize } from "rxjs";
import { AppState } from "src/app-store";
import { ContactsActionTypes, ContactsSuccess, IsLoadingContacts } from "../contacts.actions";
import { ContactsService } from "../services/contacts.service";

@Injectable()
export class GetContactsEffect {

    constructor(
        private actions: Actions,
        private contactService: ContactsService,
        private store: Store<AppState>
    ) { }

    getContacts$ = createEffect(() => this.actions.pipe(
        ofType(ContactsActionTypes.GetContacts),
        mergeMap(() => {
            this.store.dispatch(new IsLoadingContacts({ isLoading: true }));
            return this.contactService.getContacts().pipe(
                map(response => {
                    return new ContactsSuccess({ contacts: response });
                }),
                finalize(() => {
                    this.store.dispatch(new IsLoadingContacts({ isLoading: false }));
                })
            )
        })
    ));

}