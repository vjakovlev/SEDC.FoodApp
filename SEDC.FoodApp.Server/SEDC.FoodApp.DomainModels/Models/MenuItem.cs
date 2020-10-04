using SEDC.FoodApp.DomainModels.Enums;

namespace SEDC.FoodApp.DomainModels.Models
{
    public class MenuItem
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public int Calories { get; set; }
        public bool IsVege { get; set; }

        public MealType MealType { get; set; }
    }
}
