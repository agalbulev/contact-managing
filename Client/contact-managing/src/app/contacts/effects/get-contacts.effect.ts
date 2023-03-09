import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { MessageService } from "primeng/api";
import { map, mergeMap, finalize, catchError, throwError } from "rxjs";
import { AppState } from "src/app-store";
import { ContactsActionTypes, ContactsSuccess, IsLoadingContacts } from "../contacts.actions";
import { ContactsService } from "../services/contacts.service";

@Injectable()
export class GetContactsEffect {

    constructor(
        private actions: Actions,
        private contactService: ContactsService,
        private store: Store<AppState>,
        private messageService: MessageService
    ) { }

    getContacts$ = createEffect(() => this.actions.pipe(
        ofType(ContactsActionTypes.GetContacts),
        mergeMap(() => {
            this.store.dispatch(new IsLoadingContacts({ isLoading: true }));
            return this.contactService.getContacts().pipe(
                map(response => {
                    return new ContactsSuccess({ contacts: response });
                }),
                catchError(error => {
                    this.messageService.add({
                        severity: "error",
                        summary: "Server Error",
                        detail: error.message
                    })
                    return throwError(() => new Error(error));
                }),
                finalize(() => {
                    this.store.dispatch(new IsLoadingContacts({ isLoading: false }));
                })
            )
        })
    ));

}