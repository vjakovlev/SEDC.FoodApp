using Microsoft.AspNetCore.Mvc;
using SEDC.FoodApp.Auth.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace SEDC.FoodApp.Web.Auth
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        public UserProfileController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [Authorize]
        //POST : /api/UserProfile
        public async Task<Object> GetUserProfile()
        {
            var userId = User.Claims.First(c => c.Type == "UserId").Value;
            var user = await _userManager.FindByIdAsync(userId);
            var userRole = await _userManager.GetRolesAsync(user);

            return new
            {
                user.FullName,
                user.Email,
                user.UserName,
                Role = userRole
            };
        }

    }
}
