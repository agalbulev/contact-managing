import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './components/contacts/contacts.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './contacts.reducer';
import { EffectsModule } from '@ngrx/effects';
import { GetContactsEffect } from './effects/get-contacts.effect';




@NgModule({
  declarations: [
    ContactsComponent
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    StoreModule.forFeature("contactsModule", reducer),
    EffectsModule.forFeature([GetContactsEffect])
  ]
})
export class ContactsModule { }
