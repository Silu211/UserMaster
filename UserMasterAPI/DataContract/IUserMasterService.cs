using UserMasterAPI.DataViewModel;

namespace UserMasterAPI.DataContract
{
    public interface IUserMasterService
    {
        Task<List<UserMasterViewModel>> GetAllUserDetailsAsync();
        Task<UserMasterViewModel> GetUserDetailsByIdAsync(int userId);
        Task<int> UpsertUserDetailsAsync(UserMasterViewModel upsertModel);
        Task<int> DeleteUserAsync(int userId);
        Task<LoggedInUserViewModel?> GetLoggedinUserDetailsAsync(LogInViewModel model);
        Task<string> GetUserProfilePictureAsync(int userId);
    }
}