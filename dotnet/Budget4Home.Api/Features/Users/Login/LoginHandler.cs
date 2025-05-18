using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Budget4Home.Api.Attributes;
using Budget4Home.Api.Configuration;
using Budget4Home.Api.Configuration.Exceptions;
using Budget4Home.Api.Configuration.Models;
using Budget4Home.Api.Models.Mongo;
using Budget4Home.Api.Utils;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;

namespace Budget4Home.Api.Features.Users.Login;

[AutoRegister(typeof(LoginHandler), Scope = ServiceScope.Scoped)]
public class LoginHandler(
    IMongoCollection<UserDocument> collection,
    Budget4HomeSettings settings)
{
    public async Task<string> RunAsync(LoginRequest request, CancellationToken cancellationToken)
    {
        var result = await collection
            .Find(x => x.Email == request.Email)
            .FirstOrDefaultAsync(cancellationToken) ?? throw new NotFoundException("User not found");

        if (!BCrypt.Net.BCrypt.Verify(request.Password + settings.SecurityKey, result.Password))
        {
            throw new NotFoundException("User not found");
        }
        
        return GenerateJwtToken(result);
    }
    
    private string GenerateJwtToken(UserDocument user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(settings.SecurityKey);
        
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity([
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Name, user.Username ?? user.Email)
            ]),
            Expires = DateTime.UtcNow.Add(CacheKeys.DefaultTokenDuration),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}