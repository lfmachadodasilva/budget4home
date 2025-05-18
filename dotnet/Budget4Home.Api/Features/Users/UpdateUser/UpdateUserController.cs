using System.ComponentModel.DataAnnotations;
using Budget4Home.Api.Attributes;
using Budget4Home.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Budget4Home.Api.Features.Users.UpdateUser;

[Authorize]
[ApiController]
[Tags("users")]
[Produces("application/json")]
public class UpdateUserController(UpdateUserHandler handler) : ControllerBase
{
    [SwaggerOperation(Summary = "Update user")]
    [HttpPost("api/users/{{userId}}")]
    [ProducesResponseType(typeof(UpdateUserResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> UpdateUserAsync(
        [Required, FromRoute, Budget4HomeId] string userId,
        [Required, FromBody] UpdateUserRequest request,
        CancellationToken cancellationToken)
    {
        var result = await handler.RunAsync(userId, request, cancellationToken);
        return Ok(new UpdateUserResponse { User = new UserResponse(result) });
    }
}