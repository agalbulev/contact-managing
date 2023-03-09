import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app-store';
import { ContactsActionTypes, ContactsActionsUnion } from './contacts.actions';
import { IContact } from './services/contacts.service';

export interface ContactsState {
    isLoadingContacts: boolean;
    contacts?: IContact[]
}

const initialState: ContactsState = {
    isLoadingContacts: false,
    contacts: undefined
};

export function reducer(
    state = initialState,
    action: ContactsActionsUnion
): ContactsState {
    switch (action.type) {
        case ContactsActionTypes.ContactsSuccess: {
            return {
                ...state,
                contacts: action.payload.contacts
            }
        }
        case ContactsActionTypes.IsLoadingContacts: {
            return {
                ...state,
                isLoadingContacts: action.payload.isLoading
            }
        }
        default: {
            return state;
        }
    }
}

export const selectFeature = (state: AppState) => state.contactsModule;

export const selectContacts = createSelector(
    selectFeature,
    (state: ContactsState) => state.contacts
);

export const selectContactsLoading = createSelector(
    selectFeature,
    (state: ContactsState) => state.isLoadingContacts
);