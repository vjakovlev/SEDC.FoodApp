using SEDC.FoodApp.DataAccess.Repositories.Interfaces;
using SEDC.FoodApp.DomainModels.Models;
using SEDC.FoodApp.RequestModels.Models;
using SEDC.FoodApp.Services.Services.Interfaces;
using System;
using System.Collections.Generic;
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

        public async Task CreateNewRestaurant(RestaurantRequestModel model) 
        {
            var dtoRestaurant = new Restaurant()
            {
                Name = model.Name,
                Address = model.Address,
                Municipality = model.Municipality,
                Menu = new List<MenuItem>()
            };

            //foreach (var menuItem in model.Menu)
            //{
            //    var tempMenuItem = new MenuItem()
            //    {
            //        Name = menuItem.Name,
            //        Price = menuItem.Price,
            //        Calories = menuItem.Calories,
            //        IsVege = menuItem.IsVege,
            //        MealType = menuItem.MealType
            //    };
            //}

            await _restaurantRepository.InsertRestaurant(dtoRestaurant);
        }
    }
}
