using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Budget4Home.Api.Configuration.Contexts;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Budget4Home.Api.Configuration.Filters;

public class AuthActionFilter(AuthContext authContext) : IActionFilter
{
    public void OnActionExecuting(ActionExecutingContext context)
    {
        if (context.HttpContext.Request.Headers.TryGetValue("Authorization", out var authHeader))
        {
            var bearerToken = authHeader.FirstOrDefault()?.Split(" ").Last();

            if (!string.IsNullOrEmpty(bearerToken))
            {
                var handler = new JwtSecurityTokenHandler();
                if (handler.CanReadToken(bearerToken))
                {
                    var token = handler.ReadJwtToken(bearerToken);
                    var userId = token.Claims.FirstOrDefault(c => c.Type is ClaimTypes.NameIdentifier or "sub")?.Value;

                    if (!string.IsNullOrEmpty(userId))
                    {
                        authContext.UserId = userId;
                    }
                }
            }
        }
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
    }
}