import { ContactsActionTypes, ContactsActionsUnion } from './contacts.actions';
import { IContact } from './services/contacts.service';

export interface ContactsState {
    isLoadingContacts: boolean;
    contacts: IContact[]
}

const initialState: ContactsState = {
    isLoadingContacts: false,
    contacts: []
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