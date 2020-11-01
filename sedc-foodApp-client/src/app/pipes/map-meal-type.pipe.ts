import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapMealTypePipe'
})
export class MapMealTypePipe implements PipeTransform { 
  transform(value: any) {
        switch(value) {
          case 1: 
            return "Starters"
          case 2: 
            return "Salads" 
          case 3: 
            return "Main Dish" 
          case 4: 
            return "Deserts" 
          case 5: 
            return "Drinks" 
        }
  }
}