import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";
import { ContactsActionTypes, ContactsSuccess } from "../contacts.actions";
import { ContactsService } from "../services/contacts.service";

@Injectable()
export class GetContactsEffect {

    constructor(
        private actions: Actions,
        private contactService: ContactsService,
    ) { }

    getContacts$ = createEffect(() => this.actions.pipe(
        ofType(ContactsActionTypes.GetContacts),
        mergeMap(() => this.contactService.getContacts().pipe(
            map(response => new ContactsSuccess({ contacts: response }))
        ))
    ));

}