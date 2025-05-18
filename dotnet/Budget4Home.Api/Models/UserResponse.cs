using Budget4Home.Api.Models.Mongo;

namespace Budget4Home.Api.Models;

public class UserResponse(UserDocument document)
{
    public string Id { get; set; } = document.Id.ToString();
    public string Username { get; set; } = document.Username;
    public string Email { get; set; } = document.Email;
}