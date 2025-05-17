using System.Net;
using System.Net.Mime;
using System.Text.Json;
using Budget4Home.Api.Configuration.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace Budget4Home.Api.Configuration;

public class GlobalExceptionMiddleware(RequestDelegate next)
{
    private static readonly JsonSerializerOptions JsonSerializerOptions = new() { WriteIndented = true };
    
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            // Call the next delegate/middleware in the pipeline.
            await next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.StatusCode = GetHttpStatusCode(exception);
        var isInternalServerError = context.Response.StatusCode >= (int)HttpStatusCode.InternalServerError;
        
        context.Response.ContentType = MediaTypeNames.Application.Json;
        await context.Response.WriteAsync(
            JsonSerializer.Serialize(
                new ProblemDetails
                {
                    Status = context.Response.StatusCode,
                    Detail = isInternalServerError ? "Internal server error" : exception.Message,
                }, 
                options: JsonSerializerOptions));
    }
    
    private static int GetHttpStatusCode(Exception exception)
    {
        return exception switch
        {
            NotFoundException => StatusCodes.Status404NotFound,
            InvalidOperationException => StatusCodes.Status400BadRequest,
            _ => StatusCodes.Status500InternalServerError
        };
    }
}