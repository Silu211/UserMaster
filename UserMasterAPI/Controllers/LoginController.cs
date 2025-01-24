using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using UserMasterAPI.DataContract;
using UserMasterAPI.DataViewModel;

namespace UserMasterAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IUserMasterService _userService;
        public LoginController(IUserMasterService userService)
        {
            _userService = userService;

        }

        [HttpPost]
        [Route("LoginUser")]
        public async Task<IActionResult> LoginUser(LogInViewModel loginModel)
        {
            var userDetails = await _userService.GetLoggedinUserDetailsAsync(loginModel);
            if (userDetails is not null)
            {
                var accessToken = await GenerateAccessToken(loginModel.UserEmail);
                userDetails.AccessToken = accessToken;
                return Ok(userDetails);
            }
            else
            {
                return Ok(null);
            }
        }

        private static async Task<string> GenerateAccessToken(string userEmail)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = await Task.Run(() =>
            {
                var key = Encoding.ASCII.GetBytes("THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING");
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(
                    [
                      new Claim(ClaimTypes.Email, userEmail)
                    ]),

                    Expires = DateTime.UtcNow.AddMinutes(60),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                return tokenHandler.CreateToken(tokenDescriptor);
            });

            return tokenHandler.WriteToken(token);
        }
    }
}
