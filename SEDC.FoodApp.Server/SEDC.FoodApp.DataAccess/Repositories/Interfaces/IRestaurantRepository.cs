using SEDC.FoodApp.DomainModels.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SEDC.FoodApp.DataAccess.Repositories.Interfaces
{
    public interface IRestaurantRepository
    {
        Task InsertRestaurant(Restaurant restaurant);
        Task<Restaurant> GetRestaurantByIdAsync(string id);
        Task<List<Restaurant>> GetRestaurants(Expression<Func<Restaurant, bool>> filter);
        Task UpdateRestaurantMenu(Restaurant restaurant);

        Task DeleteRestaurantByIdAsync(string id);
    }
}
