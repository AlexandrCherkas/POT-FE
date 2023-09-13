import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'claimStatus',
})
export class ClaimStatusPipe implements PipeTransform {
  transform(status: boolean | undefined): string {
    switch(status){
      case false: return "Denied";
      case true: return "Approved";
      case null: return "Pending"
    }
  }
}
