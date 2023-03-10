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
      dateOfBirth: new FormControl<Date | null>(null, Validators.required),
      address: new FormControl<string | null>(null),
      phoneNumber: new FormControl<string | null>(null, Validators.pattern("^\\+?[0-9]{7,14}$")),
      iban: new FormControl<string | null>(null, Validators.pattern("^([A-Z]{2}[ \\-]?[0-9]{2})(?=(?:[ \\-]?[A-Z0-9]){9,30}$)((?:[ \\-]?[A-Z0-9]{3,5}){2,7})([ \\-]?[A-Z0-9]{1,3})?$"))
    });
  }

  submit() {
    if (this.form?.valid) {
      const contact = this.form.value;

      contact.dateOfBirth = format(this.form.value.dateOfBirth, "yyyy-MM-dd");
      this.store.dispatch(new AddContact({ contact }));
    }
  }

  showError(controlName: string, error: string) {
    const control = this.form?.get(controlName);
    return control?.touched && !control.pristine && control.errors && control.errors[error];
  }
}
