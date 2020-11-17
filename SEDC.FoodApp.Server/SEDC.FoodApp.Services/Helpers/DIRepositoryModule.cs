using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SEDC.FoodApp.Auth.Models;
using SEDC.FoodApp.DataAccess.NpgSql;
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
                                                              string mongoConnectionString,
                                                              string mongoDatabase,
                                                              string npgSqlDatabase)
        {

            // register mongo repositories
            services.AddScoped<IRestaurantRepository, RestaurantRepository>(provider =>
                    new RestaurantRepository(mongoConnectionString, mongoDatabase));

            services.AddScoped<IOrderRepository, OrderRepository>(provider =>
                    new OrderRepository(mongoConnectionString, mongoDatabase));

            // register npg sql db context
            services.AddDbContext<FoodAppUserDbContext>(options =>
            {
                options.UseNpgsql(npgSqlDatabase, options => options.SetPostgresVersion(new Version(9, 5)));
            });

            services.AddDefaultIdentity<ApplicationUser>()
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<FoodAppUserDbContext>();

            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 4;
            });

            return services;
        }
    }
}
