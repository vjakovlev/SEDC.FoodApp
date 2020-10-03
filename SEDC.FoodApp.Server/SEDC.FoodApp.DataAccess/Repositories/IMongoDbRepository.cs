using MongoDB.Driver.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace SEDC.FoodApp.DataAccess.Repositories
{
    public interface IMongoDbRepository<T>
    {
        IMongoQueryable<T> Collection { get; }
    }
}
