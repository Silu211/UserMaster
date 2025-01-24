using System;
using System.Collections.Generic;

namespace UserMasterAPI.DataModels;

public partial class UserMaster
{
    public int UserId { get; set; }

    public string UserName { get; set; } = null!;

    public string Password { get; set; } = null!;

    public DateTime Dob { get; set; }

    public string Address { get; set; } = null!;

    public string EmailId { get; set; } = null!;

    public string ProfilePicture { get; set; } = null!;

    public string ProfilePictureName { get; set; } = null!;
}
