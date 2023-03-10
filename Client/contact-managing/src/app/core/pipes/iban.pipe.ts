import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'iban'
})
export class IbanPipe implements PipeTransform {

    transform(value?: string) {
        if (!value) {
            return '';
        }

        return this.formatIban(value);
    }

    formatIban(iban: string) {
        var formattedIban = '';

        for (var i = 0; i < iban.length; i += 1) {
            if (i > 0 && i % 4 === 0) {
                formattedIban += ' ';
            }
            formattedIban += iban[i];
        }

        return formattedIban;
    }
}
