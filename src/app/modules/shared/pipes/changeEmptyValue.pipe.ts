import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changeEmptyValue',
})
export class ChangeEmptyValuePipe implements PipeTransform {
  transform(value: any): any {
    return value? value : '---------'
  }
}