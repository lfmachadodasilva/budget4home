using System.ComponentModel.DataAnnotations;
using Budget4Home.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Budget4Home.Api.Features.Users.Register;

[AllowAnonymous]
[ApiController]
[Tags("users")]
[Produces("application/json")]
public class RegisterController(RegisterHandler handler) : ControllerBase
{
    [SwaggerOperation(Summary = "Register")]
    [HttpPost("api/users")]
    [ProducesResponseType(typeof(RegisterResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> RunAsync(
        [Required, FromBody] RegisterRequest request,
        CancellationToken cancellationToken)
    {
        var result = await handler.RunAsync(request, cancellationToken);
        return Ok(new RegisterResponse { User = new UserResponse(result) });
    }
}