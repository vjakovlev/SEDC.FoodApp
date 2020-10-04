using SEDC.FoodApp.DomainModels.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace SEDC.FoodApp.RequestModels.Models
{
    public class MenuItemRequestModel
    {
        public string Name { get; set; }
        public int Price { get; set; }
        public int Calories { get; set;  }
        public bool IsVege { get; set; }
        public MealType MealType { get; set; }
    }
}
