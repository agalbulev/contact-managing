import { ContactsComponent } from './contacts.component';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TableModule } from 'primeng/table';
import { IbanPipe } from 'src/app/core/pipes/iban.pipe';
import { selectContacts, selectContactsLoading } from '../../contacts.reducer';
import { SkeletonModule } from 'primeng/skeleton';
import { GetContacts } from '../../contacts.actions';
import { DatePipe } from '@angular/common';

describe('ContactsComponent', () => {
    const initialState = {
        isLoadingContacts: false,
        contacts: undefined,
        contactsLoaded: false
    };

    const config = {
        declarations: [
            IbanPipe
        ],
        providers: [
            provideMockStore({
                initialState,
                selectors: [{
                    selector: selectContactsLoading,
                    value: false
                }, {
                    selector: selectContacts,
                    value: {
                        contacts: [],
                        contactsLoaded: false
                    }
                }]
            }),
            DatePipe
        ],
        imports: [
            TableModule,
            SkeletonModule
        ]
    };

    it('should loader rows be visible when state is true', () => {
        cy.mount(ContactsComponent, config).then(wrapper => {
            selectContactsLoading.setResult(true);
            (wrapper.component["store"] as MockStore).refreshState();
            wrapper.fixture.detectChanges();
            cy.get('[data-cy=loader-row]').should("be.visible");
        });
    })

    it('should loader rows be hidden when state is false', () => {
        cy.mount(ContactsComponent, config).then(wrapper => {
            const store = wrapper.component["store"] as MockStore;
            selectContactsLoading.setResult(false);
            store.refreshState();
            wrapper.fixture.detectChanges();
            cy.get('[data-cy=loader-row]').should("not.exist");
        });
    })

    it('should trigger get contacts when contactsLoaded in state is false', () => {
        cy.mount(ContactsComponent, config).then(wrapper => {
            const store = wrapper.component["store"] as MockStore;
            const spy = cy.spy(store, "dispatch");
            selectContacts.setResult({
                contacts: [],
                contactsLoaded: false
            });
            store.refreshState();
            wrapper.fixture.detectChanges();
            expect(spy).to.be.calledWith(new GetContacts());
        });
    })

    it("should show two rows of contact details", () => {
        cy.mount(ContactsComponent, config).then(wrapper => {
            const store = wrapper.component["store"] as MockStore;
            selectContacts.setResult({
                contacts: [{
                    firstName: "first",
                    surname: "sur",
                    dateOfBirth: "2022-05-05"
                }, {
                    firstName: "first",
                    surname: "sur",
                    dateOfBirth: "2022-05-05"
                }],
                contactsLoaded: true
            });
            store.refreshState();
            wrapper.fixture.detectChanges();
            cy.get('[data-cy=contact-row]').should("have.length", "2")
        });
    })
})