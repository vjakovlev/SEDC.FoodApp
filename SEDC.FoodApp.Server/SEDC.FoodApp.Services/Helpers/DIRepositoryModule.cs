using Microsoft.Extensions.DependencyInjection;
using SEDC.FoodApp.DataAccess.Repositories.Classes;
using SEDC.FoodApp.DataAccess.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace SEDC.FoodApp.Services.Helpers
{
    //Microsoft.Extensions.DependencyInjection
    public static class DIRepositoryModule
    {
        public static IServiceCollection RegisterRepositories(IServiceCollection services, 
                                                              string connectionString,
                                                              string database)
        {
            services.AddScoped<IRestaurantRepository, RestaurantRepository>(provider =>
                    new RestaurantRepository(connectionString, database));

            return services;
        }
    }
}
