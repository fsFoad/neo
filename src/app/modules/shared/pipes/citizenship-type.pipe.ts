import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'citizenshipType'
})
export class CitizenshipTypePipe implements PipeTransform {

    transform(value: number): string {
        switch (Number(value)) {
            case null:
                return null;
            case 1:
                return 'ایرانی';
            case 2:
                return 'غیر ایرانی';
            default:
                return null;
        }
    }
}
