import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aliveType'
})
export class AliveTypePipe implements PipeTransform {
    transform(value: number): string {
        switch (Number(value)) {
            case null:
                return null;
            case 0:
                return 'زنده';
            case 1:
                return 'فوت شده';
            default:
                return null;
        }
    }
}
