import { Action } from "@ngrx/store";
import { IContact } from "./services/contacts.service";

export enum ContactsActionTypes {
    GetContacts = '[Contacts] Get All Contacts',
    IsLoadingContacts = '[Contacts] Is Loading',
    ContactsSuccess = '[Contacts] Success',
    AddContact = '[Contacts] Add',
    AddContactSuccess = '[Contacts] Add Success'
}

export class GetContacts implements Action {
    readonly type = ContactsActionTypes.GetContacts;
}

export class IsLoadingContacts implements Action {
    readonly type = ContactsActionTypes.IsLoadingContacts;

    constructor(public payload: { isLoading: boolean }) { };
}

export class ContactsSuccess implements Action {
    readonly type = ContactsActionTypes.ContactsSuccess;

    constructor(public payload: { contacts: IContact[] }) { }
}

export class AddContact implements Action {
    readonly type = ContactsActionTypes.AddContact;

    constructor(public payload: { contact: IContact }) {}
}

export class AddContactSuccess implements Action {
    readonly type = ContactsActionTypes.AddContactSuccess;

    constructor(public payload: { contact: IContact }) {}
}

export type ContactsActionsUnion = GetContacts | IsLoadingContacts | ContactsSuccess | AddContact | AddContactSuccess;