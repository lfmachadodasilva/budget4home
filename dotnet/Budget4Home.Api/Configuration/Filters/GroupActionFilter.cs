using Budget4Home.Api.Configuration.Exceptions;
using Budget4Home.Api.Features.Groups.GetGroup;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Budget4Home.Api.Configuration.Filters;

public class GroupActionFilter(GetGroupHandler handler) : IActionFilter
{
    public void OnActionExecuting(ActionExecutingContext context)
    {
        if (context.ActionArguments.TryGetValue("groupId", out var groupId) &&
            groupId is string groupIdString &&
            !string.IsNullOrWhiteSpace(groupIdString))
        {
            try
            {
                handler
                    .RunAsync(groupIdString, context.HttpContext.RequestAborted)
                    .GetAwaiter()
                    .GetResult();
            }
            catch (NotFoundException ex)
            {
                context.Result = new NotFoundObjectResult(new
                {
                    Message = ex.Message
                });
            }
        }
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
    }
}