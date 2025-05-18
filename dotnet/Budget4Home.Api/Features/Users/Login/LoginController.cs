using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Budget4Home.Api.Features.Users.Login;

[AllowAnonymous]
[ApiController]
[Tags("users")]
[Produces("application/json")]
public class LoginController(LoginHandler handler) : ControllerBase
{
    [SwaggerOperation(Summary = "Login")]
    [HttpPost("api/users/login")]
    [ProducesResponseType(typeof(LoginResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> LoginAsync(
        [FromBody, Required] LoginRequest request,
        CancellationToken cancellationToken)
    {
        var result = await handler.RunAsync(request, cancellationToken);
        return Ok(new LoginResponse { Token = result });
    }
}