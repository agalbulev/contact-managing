import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getContacts() {
    return this.httpClient.get(`${environment.apiUrl}/contacts`);
  }
}
