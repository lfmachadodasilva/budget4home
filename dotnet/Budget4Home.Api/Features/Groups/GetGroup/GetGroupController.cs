using Budget4Home.Api.Attributes;
using Budget4Home.Api.Configuration.Auth;
using Budget4Home.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Budget4Home.Api.Features.Groups.GetGroup;

[ApiController]
[Route("api/groups/{groupId}")]
[Tags("groups")]
[Produces("application/json")]
public class GetGroupController(GetGroupHandler handler) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(typeof(GetGroupResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetGroupAsync(
        [FromRoute, Budget4HomeId] string groupId,
        CancellationToken cancellationToken)
    {
        var result = await handler.Handle(groupId, cancellationToken);
        return Ok(new GetGroupResponse { Group = new GroupResponse(result) });
    }
}