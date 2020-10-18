using SEDC.FoodApp.DataAccess.Repositories.Interfaces;
using SEDC.FoodApp.DomainModels.Enums;
using SEDC.FoodApp.DomainModels.Models;
using SEDC.FoodApp.RequestModels.Models;
using SEDC.FoodApp.Services.Helpers;
using SEDC.FoodApp.Services.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace SEDC.FoodApp.Services.Services.Classes
{
    public class RestorantService : IRestorantService
    {
        private readonly IRestaurantRepository _restaurantRepository;
        public RestorantService(IRestaurantRepository restaurantRepository)
        {
            _restaurantRepository = restaurantRepository;
        }

        public async Task CreateNewRestaurantAsync(RestaurantRequestModel model) 
        {
            var dtoRestaurant = new Restaurant()
            {
                Name = model.Name,
                Address = model.Address,
                Municipality = (Municipality)model.Municipality,
                Menu = new List<MenuItem>()
            };

            await _restaurantRepository.InsertRestaurant(dtoRestaurant);
        }

        public async Task<IEnumerable<RestaurantRequestModel>> GetRestaurantsAsync(RestaurantRequestModel requestModel) 
        {
            Expression<Func<Restaurant, bool>> filter = f => true;

            if (!string.IsNullOrEmpty(requestModel.Id))
            {
                filter = filter.AndAlso(x => x.Id == requestModel.Id);
            }

            if (!string.IsNullOrEmpty(requestModel.Name)) 
            {
                filter = filter.AndAlso(x => x.Name.ToLower().Contains(requestModel.Name.ToLower()));
            }

            if (!string.IsNullOrEmpty(requestModel.Address))
            {
                filter = filter.AndAlso(x => x.Address.ToLower().Contains(requestModel.Address.ToLower()));
            }

            if (requestModel.Municipality.HasValue) 
            {
                filter = filter.AndAlso(x => x.Municipality == requestModel.Municipality);
            }

            IEnumerable<Restaurant> response = await _restaurantRepository.GetRestaurants(filter);

            var responseToRequestModel = new List<RestaurantRequestModel>();

            foreach (var item in response)
            {
                var tempModel = new RestaurantRequestModel()
                {
                    Id = item.Id,
                    Name = item.Name,
                    Address = item.Address,
                    Municipality = item.Municipality,
                    Menu = item.Menu
                };

                responseToRequestModel.Add(tempModel);
            }

            return responseToRequestModel;
        }

        public async Task<Restaurant> GetRestaurantByIdAsync(string id) 
        {
            return await _restaurantRepository.GetRestaurantByIdAsync(id);
        }

        public async Task UpdateRestaurantAsync(Restaurant restaurant) 
        {
            await _restaurantRepository.UpdateRestaurantMenu(restaurant);
        }

        public async Task UpdateRestaurantMenuAsync(Restaurant restaurant, MenuItemRequestModel menuItem) 
        {

            
            if (menuItem.Id == null)
            {
                var dtoMenuItem = new MenuItem()
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = menuItem.Name,
                    Calories = menuItem.Calories,
                    IsVege = menuItem.IsVege,
                    Price = menuItem.Price,
                    MealType = menuItem.MealType
                };

                restaurant.Menu.Add(dtoMenuItem);
            }
            else 
            {
                for (int i = 0; i < restaurant.Menu.Count; i++)
                {
                    if (restaurant.Menu[i].Id == menuItem.Id)
                    {
                        restaurant.Menu[i].Id = menuItem.Id;
                        restaurant.Menu[i].Name = menuItem.Name;
                        restaurant.Menu[i].Calories = menuItem.Calories;
                        restaurant.Menu[i].Price = menuItem.Price;
                        restaurant.Menu[i].IsVege = menuItem.IsVege;
                        restaurant.Menu[i].MealType = menuItem.MealType;

                        break;
                    }
                }
            }

            await _restaurantRepository.UpdateRestaurantMenu(restaurant);
        }

        public async Task DeleteRestaurantByIdAsync(string id) 
        {
            await _restaurantRepository.DeleteRestaurantByIdAsync(id);
        }

        public async Task UpdateRestaurantMenuItemsAsync(Restaurant restaurant, string menuItemId) 
        {
            var menuItem = restaurant.Menu.FirstOrDefault(x => x.Id == menuItemId);

            restaurant.Menu.Remove(menuItem);

            await _restaurantRepository.UpdateRestaurantMenu(restaurant);
        }
    }
}
