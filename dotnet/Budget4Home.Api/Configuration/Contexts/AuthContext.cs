using Budget4Home.Api.Attributes;

namespace Budget4Home.Api.Configuration.Contexts;

[AutoRegister(typeof(AuthContext), Scope = ServiceScope.Scoped)]
public class AuthContext
{
    public string UserId { get; set; }
}