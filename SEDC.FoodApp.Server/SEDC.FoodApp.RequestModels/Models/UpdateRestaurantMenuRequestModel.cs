using System;
using System.Collections.Generic;
using System.Text;

namespace SEDC.FoodApp.RequestModels.Models
{
    public class UpdateRestaurantMenuRequestModel
    {
        public string Id { get; set; }
        public MenuItemRequestModel MenuItem { get; set; }
    }
}
