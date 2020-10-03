export interface RestorauntRequestModel {
  name: string;
  address: string;
//   menu: Array<MenuItemRequestModel>;
  municipality: Municipality;
}

export enum Municipality {
  KARPOS = 1,
  CENTAR,
  AERODROM,
}

export interface MenuItemRequestModel {
  name: string;
  price: number;
  calories:number;
  isVege:boolean;
  mealType:MealType
}

export enum MealType {
  STARTERS = 1,
  SALADS,
  MAINDISH,
  DESERTS,
  DRINKS,
}
