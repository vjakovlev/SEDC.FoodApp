using SEDC.FoodApp.DataAccess.Repositories.Interfaces;
using SEDC.FoodApp.DomainModels.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SEDC.FoodApp.DataAccess.Repositories.Classes
{
    public class OrderRepository : MongoDbRepository<Order>, IOrderRepository
    {
        public OrderRepository(string connectionString, string databaseName)
            : base(connectionString, databaseName) { }

        protected override string GetCollectionName()
        {
            return typeof(Restaurant).Name + "s";
        }

        public async Task InsertOrder(Order order) 
        {
            await InsertAsync(order);
        }

    }
}
