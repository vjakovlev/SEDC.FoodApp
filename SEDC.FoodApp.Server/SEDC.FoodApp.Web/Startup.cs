using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SEDC.FoodApp.Services.Helpers;
using SEDC.FoodApp.Services.Services.Classes;
using SEDC.FoodApp.Services.Services.Interfaces;

namespace SEDC.FoodApp.Web
{
    //Microsoft.AspNetCore.Cors
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();


            //Mongo Db
            var connectionString = Configuration.GetSection("MongoUserStoreConnection").GetValue<string>("ConnectionString");
            var database = Configuration.GetSection("MongoUserStoreConnection").GetValue<string>("Database");

            //Register Services
            services.AddTransient<IRestorantService, RestorantService>();

            //Dipendency Injection Module
            DIRepositoryModule.RegisterRepositories(services, connectionString, database);

            services.AddCors();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(builder =>
                builder.WithOrigins("http://localhost:4200", "http://localhost:4201")
                    .AllowAnyHeader()
                    .AllowAnyMethod());

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
