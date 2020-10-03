using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        [HttpPost("AddRestaurant")]
        public async Task<IActionResult> AddRestorant([FromBody] RestaurantRequestModel model) 
        {
            await _restorantService.CreateNewRestaurant(model);
            return Ok();
        }


    }
}
