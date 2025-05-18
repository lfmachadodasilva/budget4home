using Budget4Home.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Budget4Home.Api.Features.Users.GetUsers;

[Authorize]
[ApiController]
[Tags("users")]
[Produces("application/json")]
public class GetUsersController(GetUsersHandle handler) : ControllerBase
{
    [SwaggerOperation(Summary = "Get users")]
    [HttpGet("api/users")]
    [ProducesResponseType(typeof(GetUsersResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetUsersAsync(CancellationToken cancellationToken)
    {
        var result = await handler.RunAsync(cancellationToken);
        return Ok(new GetUsersResponse { Users = result.Select(x => new UserResponse(x)).ToList() });
    }
}