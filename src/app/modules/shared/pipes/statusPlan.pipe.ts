import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'statusPlan',
})
export class StatusPlanPipe implements PipeTransform {
  transform(status: boolean, startDate: string, endDate: string, currentDate: string): string {
    if(!status && (endDate > currentDate)){
      return 'Not initialized'
    } else if(!status && (endDate < currentDate)){
      return `Initialized on ${moment(startDate).format("YYYY-MM-DD")}`
    } else  if(status){
      return 'Active'
    } else {
      return " "
    }

  }

}
