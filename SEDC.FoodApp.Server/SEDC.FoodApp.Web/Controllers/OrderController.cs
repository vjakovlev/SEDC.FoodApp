using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SEDC.FoodApp.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {


        [HttpPut("UpdateOrder/{menuItemId}")]
        public async Task<IActionResult> UpdateOrder([FromRoute] string menuItemId) 
        {
            return Ok();
        }


    }
}
