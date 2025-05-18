using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Budget4Home.Api.Configuration.Auth;

public class AuthActionFilter(AuthContext authContext) : IActionFilter
{
    public void OnActionExecuting(ActionExecutingContext context)
    {
        // TODO: Get the user ID from the request context
        // authContext.UserId = "6828782ffa2e8ccd9bb40e61";
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