import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatSSN',
})
export class FormatSSNPipe implements PipeTransform {
  transform(ssn: string): string {
    const SSN = ssn.split('');
    const firstPart = SSN.slice(0, 3).join('')
    const secondPart = SSN.slice(3, 5).join('')
    const thirdPart = SSN.slice(5, 8).join('')

    return `${firstPart}-${secondPart}-${thirdPart}`
  }
}
