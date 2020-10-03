using SEDC.FoodApp.DomainModels.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace SEDC.FoodApp.RequestModels.Models
{
    public class RestaurantRequestModel
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public Municipality Municipality { get; set; }
        //public List<MenuItemRequestMode> Menu { get; set; }
    }
}
