using System.ComponentModel.DataAnnotations;
using Budget4Home.Api.Models.Mongo;
using MongoDB.Bson;

namespace Budget4Home.Api.Features.Users.Login;

public class LoginRequest
{
    [Required, EmailAddress]
    public string Email { get; set; }
    [Required, MinLength(4)]
    public string Password { get; set; }

    public UserDocument ToDocument(string id) => new()
    {
        Id = string.IsNullOrEmpty(id) ? ObjectId.GenerateNewId() : ObjectId.Parse(id),
        Email = Email,
        Password = Password
    };
}