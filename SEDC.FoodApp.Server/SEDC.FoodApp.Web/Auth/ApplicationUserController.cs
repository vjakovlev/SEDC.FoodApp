using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using SEDC.FoodApp.Auth.Models;
using SEDC.FoodApp.Mailer;
using SEDC.FoodApp.Mailer.Models;

namespace SEDC.FoodApp.Web.Auth
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {
        public IConfiguration Configuration { get; }
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;
        private ILogger<ApplicationUserController> _logger;

        public ApplicationUserController(IConfiguration configuration,
                                         UserManager<ApplicationUser> userManager,
                                         SignInManager<ApplicationUser> signInManager)
        {
            Configuration = configuration;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost]
        [Route("Register")]
        //POST : /api/applicationuser/register
        public async Task<Object> RegisterUser([FromBody] RegisterRequestModel model)
        {
            model.Role = "CUSTOMER";

            var applicationUser = new ApplicationUser()
            {
                UserName = model.UserName,
                Email = model.Email,
                FullName = model.FullName
            };

            try
            {
                var result = await _userManager.CreateAsync(applicationUser, model.Password);
                await _userManager.AddToRoleAsync(applicationUser, model.Role);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("Login")]
        //POST : /api/applicationuser/login
        public async Task<IActionResult> LoginUser([FromBody] LoginRequestModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                //get roles assigned to user
                var role = await _userManager.GetRolesAsync(user);
                var options = new IdentityOptions();

                try
                {
                    var tokenDescriptor = new SecurityTokenDescriptor()
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserId", user.Id.ToString()),
                        new Claim(options.ClaimsIdentity.RoleClaimType, role.FirstOrDefault()),
                        new Claim("UserName", user.UserName)
                    }),
                        Expires = DateTime.UtcNow.AddDays(1),
                        SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(
                                Configuration.GetSection("ApplicationSttings").GetValue<string>("JWT_secret"))),
                        SecurityAlgorithms.HmacSha256Signature),
                    };

                    var tokenHandler = new JwtSecurityTokenHandler();
                    var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                    var token = tokenHandler.WriteToken(securityToken);
                    return Ok(new { token });
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            else
            {
                return BadRequest("Username or password incorect!");
            }
        }

        [HttpPost]
        [Route("ChangePassword")]
        //POST : /api/applicationuser/ChangePassword
        public async Task<IActionResult> ChangeUserPassword([FromBody] ChangePasswordRequestModel model) 
        {
            try
            {
                var user = await _userManager.FindByIdAsync(model.UserId);
                var response = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);

                if (response.Succeeded)
                {
                    return Ok(new { message = "Password changed successfully!" });
                }
                else 
                {
                    return BadRequest("Passwords does not match!");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("ForgotPassword")]
        public async Task<IActionResult> ForgotUserPassword([FromBody] ForgotPasswordRequestModel model) 
        {

            try
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);

                byte[] tokenBytes = Encoding.UTF8.GetBytes(token);
                var codeEncoded = WebEncoders.Base64UrlEncode(tokenBytes);

                var clientAddress = Configuration.GetSection("ApplicationSttings").GetValue<string>("ClientAddress");
                var passwordResetLink = $"{clientAddress}/user/reset-password?email={user.Email}&token={codeEncoded}";

                var newEmail = new Email()
                {
                    To = user.Email,
                    Subject = "reset password",
                    Body = $"Reset password here: {passwordResetLink}"
                };

                SendMail.Execute(newEmail);

                return Ok(new { message = $"A link to reset your password has been sent to your email address: {maskEmail(user.Email)}" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
     
        }

        [HttpGet]
        [Route("ResetPassword")]
        public async Task<IActionResult> ResetUserPassword([FromQuery] string email, string token, string newPassword)
        {
            var user = await _userManager.FindByEmailAsync(email);
            var codeDecodedBytes = WebEncoders.Base64UrlDecode(token);
            var codeDecoded = Encoding.UTF8.GetString(codeDecodedBytes);
            var response = await _userManager.ResetPasswordAsync(user, codeDecoded, newPassword);

            if (response.Succeeded) 
            {
                return Ok(new { message = $"Password successfully changed!" });
            }

            return BadRequest("Error has occured, password not changed!");
        }

        private string maskEmail(string email) 
        {
            string pattern = @"(?<=[\w]{1})[\w-\._\+%]*(?=[\w]{1}@)";
            return Regex.Replace(email, pattern, m => new string('*', m.Length));
        }
    }
}
