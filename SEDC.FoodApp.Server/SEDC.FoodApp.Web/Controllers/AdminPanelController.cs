using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SEDC.FoodApp.DomainModels.Enums;
using SEDC.FoodApp.RequestModels.Models;
using SEDC.FoodApp.Services.Services.Interfaces;

namespace SEDC.FoodApp.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminPanelController : ControllerBase
    {
        private readonly IRestorantService _restorantService;

        public AdminPanelController(IRestorantService restorantService)
        {
            _restorantService = restorantService;
        }

        //api/AdminPanel/AddRestaurant
        [HttpPost("AddRestaurant")]
        public async Task<IActionResult> AddRestaurantAsync([FromBody] RestaurantRequestModel model) 
        {
            await _restorantService.CreateNewRestaurantAsync(model);
            return Ok();
        }

        //api/AdminPanel/GetRestaurants queries are optional ex: ?id=12345
        [HttpGet("GetRestaurants")]
        public async Task<IActionResult> GetRestaurantsAsync([FromQuery] string id,
                                                             [FromQuery] string name, 
                                                             [FromQuery] string address,
                                                             [FromQuery] Municipality? municipality) 
        {
            var requestModel = new RestaurantRequestModel()
            {
                Id = id,
                Name = name,
                Address = address,
                Municipality = municipality
            };

            var response = await _restorantService.GetRestaurantsAsync(requestModel);
            return Ok(response);
        }

        //api/AdminPanel/UpdateRestaurantMenu 
        [HttpPost("UpdateRestaurantMenu")]
        public async Task<IActionResult> UpdateRestaurantMenuAsync([FromBody] UpdateRestaurantMenuRequestModel requestModel) 
        {
            var restaurant = await _restorantService.GetRestaurantByIdAsync(requestModel.Id);

            await _restorantService.UpdateRestaurantMenuAsync(restaurant, requestModel.MenuItem);

            return Ok();
        }

        //api/AdminPanel/DeleteRestaurant 
        [HttpDelete("DeleteRestaurant")]
        public async Task<IActionResult> DeleteRestaurantAsync([FromQuery] string id) 
        {
            await _restorantService.DeleteRestaurantByIdAsync(id);
            return Ok();
        }

        //api/AdminPanel/DeleteMenuItem 
        [HttpDelete("DeleteMenuItem")]
        public async Task<IActionResult> DeleteMenuItemAsync([FromQuery] string restaurantId, 
                                                             [FromQuery] string menuItemId) 
        {
            var restaurant = await _restorantService.GetRestaurantByIdAsync(restaurantId);
            await _restorantService.UpdateRestaurantMenuItemsAsync(restaurant, menuItemId);
            return Ok();
        }

    }
}
