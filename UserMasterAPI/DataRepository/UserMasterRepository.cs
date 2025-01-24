using Microsoft.EntityFrameworkCore;
using UserMasterAPI.DataContract;
using UserMasterAPI.DataModels;
using UserMasterAPI.DataViewModel;

namespace UserMasterAPI.DataRepository;

public class UserMasterRepository : IUserMasterService
{
    private readonly UserMasterDbContext _userMasterContext;
    public UserMasterRepository(UserMasterDbContext userMasterContext)
    {
        _userMasterContext = userMasterContext;
    }

    public async Task<List<UserMasterViewModel>> GetAllUserDetailsAsync()
    => await (from um in _userMasterContext.UserMasters
              orderby um.UserId descending
              select new UserMasterViewModel
              {
                  UserId = um.UserId,
                  UserName = um.UserName,
                  Password = um.Password,
                  Dob = um.Dob,
                  Address = um.Address,
                  EmailId = um.EmailId,
                  //ProfilePicture = um.ProfilePicture,
                  ProfilePictureName = um.ProfilePictureName
              }).ToListAsync();

    public async Task<UserMasterViewModel> GetUserDetailsByIdAsync(int userId)
    => await (from um in _userMasterContext.UserMasters
              where um.UserId == userId
              select new UserMasterViewModel
              {
                  UserId = um.UserId,
                  UserName = um.UserName,
                  Password = um.Password,
                  Dob = um.Dob,
                  Address = um.Address,
                  EmailId = um.EmailId,
                  ProfilePicture = um.ProfilePicture,
                  ProfilePictureName = um.ProfilePictureName
              }).SingleAsync();

    public async Task<int> UpsertUserDetailsAsync(UserMasterViewModel upsertModel)
    {
        if (upsertModel.UserId == 0)
        {
            var modelToSave = new UserMaster
            {
                UserName = upsertModel.UserName,
                Password = upsertModel.Password,
                Dob = upsertModel.Dob,
                Address = upsertModel.Address,
                EmailId = upsertModel.EmailId,
                ProfilePicture = upsertModel.ProfilePicture,
                ProfilePictureName = upsertModel.ProfilePictureName
            };
            _userMasterContext.UserMasters.Add(modelToSave);
            await _userMasterContext.SaveChangesAsync();
            return modelToSave.UserId;
        }
        else
        {
            var existingUserMaster = await _userMasterContext.UserMasters.Where(um => um.UserId == upsertModel.UserId).SingleOrDefaultAsync();

            existingUserMaster.UserName = upsertModel.UserName;
            existingUserMaster.Password = upsertModel.Password;
            existingUserMaster.Dob = upsertModel.Dob;
            existingUserMaster.Address = upsertModel.Address;
            existingUserMaster.EmailId = upsertModel.EmailId;
            existingUserMaster.ProfilePicture = upsertModel.ProfilePicture;
            existingUserMaster.ProfilePictureName = upsertModel.ProfilePictureName;

            var updatedUserMaster = _userMasterContext.UserMasters.Attach(existingUserMaster);
            updatedUserMaster.State = EntityState.Modified;
            await _userMasterContext.SaveChangesAsync();
            return existingUserMaster.UserId;
        }
    }

    public async Task<int> DeleteUserAsync(int userId)
    {
        var existingUserMaster = await _userMasterContext.UserMasters.Where(um => um.UserId == userId).SingleOrDefaultAsync();

        var deleteUserMaster = _userMasterContext.UserMasters.Attach(existingUserMaster);
        deleteUserMaster.State = EntityState.Deleted;
        await _userMasterContext.SaveChangesAsync();
        return existingUserMaster.UserId;
    }

    public async Task<LoggedInUserViewModel?> GetLoggedinUserDetailsAsync(LogInViewModel model)
    {
        return await _userMasterContext.UserMasters
            .Where(u => u.EmailId == model.UserEmail && u.Password == model.Password)
            .Select(u => new LoggedInUserViewModel
            {
                UserId = u.UserId,
                ProfilePicture = u.ProfilePicture,
                UserEmail = u.EmailId,
                UserName = u.UserName,
                AccessToken = string.Empty,
            }).SingleOrDefaultAsync();
    }

    public async Task<string> GetUserProfilePictureAsync(int userId)
      => await _userMasterContext.UserMasters.Where(u => u.UserId == userId).Select(u => u.ProfilePicture).SingleAsync();

}
