
namespace UserMasterAPI.DataViewModel;

public class UserMasterViewModel
{
    public int UserId { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public DateTime Dob { get; set; }
    public string Address { get; set; } = string.Empty;
    public string EmailId { get; set; } = string.Empty;
    public string ProfilePicture { get; set; } = string.Empty;
    public string ProfilePictureName { get; set; } = string.Empty;
}