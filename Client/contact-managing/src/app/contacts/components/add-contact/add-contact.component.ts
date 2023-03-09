import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { format } from 'date-fns';
import { AddContact } from '../../contacts.actions';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  public form: FormGroup | undefined;
  public maxDateValue = new Date();

  constructor(
    private store: Store
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl("", Validators.required),
      surname: new FormControl("", Validators.required),
      dateOfBirth: new FormControl<Date | null>(null, Validators.required)
    });
  }

  submit() {
    if (this.form?.valid) {
      const contact = this.form.value;

      contact.dateOfBirth = format(this.form.value.dateOfBirth, "yyyy-MM-dd");
      this.store.dispatch(new AddContact({ contact }));
    }
  }
}
