using Microsoft.AspNetCore.Mvc.Filters;

namespace Budget4Home.Api.Configuration.Auth;

public class AuthActionFilter(AuthContext authContext) : IActionFilter
{
    public void OnActionExecuting(ActionExecutingContext context)
    {
        // TODO: Get the user ID from the request context
        authContext.UserId = "1234567890";
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
    }
}