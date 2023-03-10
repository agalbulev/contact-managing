import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface IContact {
  id?: number;
  firstName: string;
  surname: string;
  dateOfBirth: string;
  address?: string;
  phoneNumber?: string;
  iban?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getContacts() {
    return this.httpClient.get<IContact[]>(`${environment.apiUrl}/contacts`);
  }

  addContact(contact: IContact) {
    return this.httpClient.post<number>(`${environment.apiUrl}/contacts`, contact);
  }
}
