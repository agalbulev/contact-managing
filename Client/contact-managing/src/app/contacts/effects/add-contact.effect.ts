import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";
import { AddContact, AddContactSuccess, ContactsActionTypes, ContactsSuccess, IsLoadingContacts } from "../contacts.actions";
import { ContactsService } from "../services/contacts.service";

@Injectable()
export class AddContactEffect {

    constructor(
        private actions: Actions,
        private contactService: ContactsService,
        private router: Router
    ) { }

    addContact$ = createEffect(() => this.actions.pipe(
        ofType(ContactsActionTypes.AddContact),
        mergeMap((action: AddContact) => {
            return this.contactService.addContact(action.payload.contact).pipe(
                map(result => {
                    this.router.navigate(["/"]);
                    return new AddContactSuccess({
                        contact: {
                            id: result,
                            ...action.payload.contact
                        }
                    })
                })
            )
        })
    ))

}