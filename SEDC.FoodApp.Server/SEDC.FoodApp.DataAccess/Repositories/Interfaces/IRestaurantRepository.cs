using SEDC.FoodApp.DomainModels.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SEDC.FoodApp.DataAccess.Repositories.Interfaces
{
    public interface IRestaurantRepository
    {
        Task InsertRestaurant(Restaurant restaurant);
    }
}
