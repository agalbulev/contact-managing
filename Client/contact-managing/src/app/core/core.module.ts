import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IbanPipe } from './pipes/iban.pipe';



@NgModule({
  declarations: [
    IbanPipe
  ],
  providers: [
    IbanPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IbanPipe
  ]
})
export class CoreModule { }
