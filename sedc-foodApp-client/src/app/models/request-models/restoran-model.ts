export class RestaurantRequestModel {
  name: string;
  address: string;
  municipality: Municipality;
}

export interface RestaurantResponseModel {
  id:number;
  name: string;
  address: string;
  municipality: Municipality;
}

export enum Municipality {
  karpos = 1,
  centar,
  aerodrom,
}

export class MenuItemRequestModel {
  name: string;
  price: number;
  calories:number;
  isVege:boolean;
  mealType:MealType;
}

export enum MealType {
  Starters = 1,
  Salads,
  MainDish,
  Deserts,
  Drinks,
}
