import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addCurrencySign',
})
export class CurrencySign implements PipeTransform {
  transform(data: string): string {
    return "$"+ data
  }
}
