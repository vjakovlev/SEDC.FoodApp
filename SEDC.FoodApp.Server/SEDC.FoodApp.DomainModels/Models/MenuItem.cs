using SEDC.FoodApp.DomainModels.Enums;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace SEDC.FoodApp.DomainModels.Models
{
    public class MenuItem
    {
        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        public string Id { get; set; }

        public string RestoranId { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public int Calories { get; set; }
        public bool IsVege { get; set; }

        public MealType MealType { get; set; }
    }
}
