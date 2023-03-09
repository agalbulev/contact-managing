import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './components/contacts/contacts.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './contacts.reducer';
import { EffectsModule } from '@ngrx/effects';
import { GetContactsEffect } from './effects/get-contacts.effect';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { AddContactComponent } from './components/add-contact/add-contact.component';

@NgModule({
  declarations: [
    ContactsComponent,
    AddContactComponent
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    StoreModule.forFeature("contactsModule", reducer),
    EffectsModule.forFeature([GetContactsEffect]),
    TableModule,
    SkeletonModule
  ]
})
export class ContactsModule { }
