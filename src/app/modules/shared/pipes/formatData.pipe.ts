import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatData',
})
export class FormatDataPipe implements PipeTransform {
  transform(data: string): string {
    return moment(data).utc().format('MM/DD/YYYY')
  }
}

