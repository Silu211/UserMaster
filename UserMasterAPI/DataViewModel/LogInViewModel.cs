namespace UserMasterAPI.DataViewModel;

public class LogInViewModel
{
    public string UserEmail { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class LoggedInUserViewModel
{
    public int UserId { get; set; }
    public string UserEmail { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
    public string ProfilePicture { get; set; } = string.Empty;
    public string AccessToken { get; set; } = string.Empty;
}
