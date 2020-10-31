using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using SEDC.FoodApp.Auth.Models;
using SEDC.FoodApp.Services.Helpers;
using SEDC.FoodApp.Services.Services.Classes;
using SEDC.FoodApp.Services.Services.Interfaces;

namespace SEDC.FoodApp.Web
{
    //Microsoft.AspNetCore.Cors
    //Microsoft.IdentityModel.Tokens
    //System.IdentityModel.Tokens.Jwt
    //Microsoft.AspNetCore.Authentication.JwtBearer
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

            var connectionStrings = Configuration.GetSection("ConnectionStrings");

            //NpgSql Db
            var npgSqlCs = connectionStrings.GetValue<string>("NpgSqlDatabase");

            //Mongo Db
            var mongoCs = connectionStrings.GetValue<string>("MongoConnectionString");
            var mongoDatabase = connectionStrings.GetValue<string>("MongoDatabase");

            //Register Services
            services.AddTransient<IRestorantService, RestorantService>();

            //Dipendency Injection Module
            DIRepositoryModule.RegisterRepositories(services, mongoCs, mongoDatabase, npgSqlCs);

            //JWT Authentication
            var key = Encoding.UTF8.GetBytes(Configuration.GetSection("ApplicationSttings").GetValue<string>("JWT_secret"));

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = false;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                };
            });

            //cors
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
                builder.WithOrigins("http://localhost:4200", "https://localhost:45551")
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
