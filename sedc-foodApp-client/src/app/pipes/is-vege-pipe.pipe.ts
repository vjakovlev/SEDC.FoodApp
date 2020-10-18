import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isVegePipe'
})
export class IsVegePipePipe implements PipeTransform { 
  transform(value: unknown) {
    return value === true ? "Yes" : "No"
  }
}
