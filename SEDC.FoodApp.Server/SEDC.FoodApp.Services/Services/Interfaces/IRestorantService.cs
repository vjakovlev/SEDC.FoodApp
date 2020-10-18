using SEDC.FoodApp.DomainModels.Models;
using SEDC.FoodApp.RequestModels.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SEDC.FoodApp.Services.Services.Interfaces
{
    public interface IRestorantService
    {
        Task CreateNewRestaurantAsync(RestaurantRequestModel model);
        Task<IEnumerable<RestaurantRequestModel>> GetRestaurantsAsync(RestaurantRequestModel requestModel);
        Task<Restaurant> GetRestaurantByIdAsync(string id);
        Task UpdateRestaurantAsync(Restaurant restaurant);
        Task UpdateRestaurantMenuAsync(Restaurant restaurant, MenuItemRequestModel menuItem);
        Task DeleteRestaurantByIdAsync(string id);

        Task UpdateRestaurantMenuItemsAsync(Restaurant restaurant, string menuItemId);
    }
}
