import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isVegePipe'
})
export class IsVegePipePipe implements PipeTransform { 
  transform(value: boolean) {
    return value ? "Yes" : "No"
  }
}
