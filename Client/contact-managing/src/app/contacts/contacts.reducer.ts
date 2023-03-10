import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app-store';
import { ContactsActionTypes, ContactsActionsUnion } from './contacts.actions';
import { IContact } from './services/contacts.service';

export interface ContactsState {
    isLoadingContacts: boolean;
    contacts?: IContact[],
    contactsLoaded: boolean;
}

const initialState: ContactsState = {
    isLoadingContacts: false,
    contacts: undefined,
    contactsLoaded: false
};

export function reducer(
    state = initialState,
    action: ContactsActionsUnion
): ContactsState {
    switch (action.type) {
        case ContactsActionTypes.ContactsSuccess: {
            return {
                ...state,
                contacts: action.payload.contacts,
                contactsLoaded: true
            }
        }
        case ContactsActionTypes.IsLoadingContacts: {
            return {
                ...state,
                isLoadingContacts: action.payload.isLoading
            }
        }
        case ContactsActionTypes.AddContactSuccess: {
            const contact = state.contacts || [];

            return {
                ...state,
                contacts: [
                    ...contact,
                    action.payload.contact
                ]
            }
        }
        default: {
            return state;
        }
    }
}

export const selectFeature = (state: AppState) => state.contactsModule;

export const selectContactsLoading = createSelector(
    selectFeature,
    (state: ContactsState) => state.isLoadingContacts
);

const selectContactList = createSelector(
    selectFeature,
    (state: ContactsState) => state.contacts
);

const selectContactsLoaded = createSelector(
    selectFeature,
    (state: ContactsState) => state.contactsLoaded
);

export const selectContacts = createSelector(
    selectContactList,
    selectContactsLoaded,
    (contacts, contactsLoaded) => {
        return {
            contacts,
            contactsLoaded
        }
    }
)