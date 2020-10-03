using SEDC.FoodApp.RequestModels.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SEDC.FoodApp.Services.Services.Interfaces
{
    public interface IRestorantService
    {
        Task CreateNewRestaurant(RestaurantRequestModel model);
    }
}
