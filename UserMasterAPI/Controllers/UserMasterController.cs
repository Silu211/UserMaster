using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using UserMasterAPI.DataContract;
using UserMasterAPI.DataViewModel;

namespace UserMasterAPI.Controllers;

[ApiController]
public class UserMasterController : ControllerBase
{
    private readonly IUserMasterService _userMasterService;
    public UserMasterController(IUserMasterService userMasterService)
    {
        _userMasterService = userMasterService;
    }

    [HttpGet]
    [Route("UserMaster/GetAllUserDetails")]
    public async Task<IActionResult> GetAllUserDetails()
    {
        try
        {
            return Ok(await _userMasterService.GetAllUserDetailsAsync());
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    [Route("UserMaster/GetUserDetailsById/{userId}")]
    public async Task<IActionResult> GetUserDetailsById(int userId)
    {
        try
        {
            return Ok(await _userMasterService.GetUserDetailsByIdAsync(userId));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost]
    [Route("UserMaster/UpsertUserDetails")]
    public async Task<IActionResult> UpsertUserDetails(UserMasterViewModel upsertModel)
    {
        try
        {
            var userMasterId = await _userMasterService.UpsertUserDetailsAsync(upsertModel);
            return Ok(userMasterId);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete]
    [Route("UserMaster/DeleteUser/{userId:int}")]
    public async Task<IActionResult> DeleteUser(int userId)
    {
        try
        {
            var deletedUserMasterId = await _userMasterService.DeleteUserAsync(userId);
            return Ok(deletedUserMasterId);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    [Route("UserMaster/GetUserProfilePicture/{userId:int}")]
    public async Task<IActionResult> GetUserProfilePicture(int userId)
    {
        try
        {
            var profilePicture = await _userMasterService.GetUserProfilePictureAsync(userId);
            return new JsonResult(profilePicture);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
