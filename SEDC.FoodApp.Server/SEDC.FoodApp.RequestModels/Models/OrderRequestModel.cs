using SEDC.FoodApp.DomainModels.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SEDC.FoodApp.RequestModels.Models
{
    public class OrderRequestModel
    {
        public List<MenuItem> MenuItems { get; set; }
    }
}
