using Budget4Home.Api.Features.Users.Login;
using Budget4Home.Api.Models.Mongo;

namespace Budget4Home.Api.Features.Users.Register;

public class RegisterRequest : LoginRequest
{
    public string Username { get; set; }
    
    public new UserDocument ToDocument(string id)
    {
        var doc = base.ToDocument(id);
        doc.Username = Username;
        return doc;
    }
}