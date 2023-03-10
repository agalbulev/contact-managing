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
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { AddContactEffect } from './effects/add-contact.effect';
import { InputMaskModule } from 'primeng/inputmask';
import { CoreModule } from '../core/core.module';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    ContactsComponent,
    AddContactComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    ContactsRoutingModule,
    StoreModule.forFeature("contactsModule", reducer),
    EffectsModule.forFeature([GetContactsEffect, AddContactEffect]),
    TableModule,
    SkeletonModule,
    ReactiveFormsModule,
    InputTextModule,
    CalendarModule,
    InputMaskModule,
    MessageModule,
    ButtonModule
  ]
})
export class ContactsModule { }
