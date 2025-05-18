using Budget4Home.Api.Attributes;
using Budget4Home.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Budget4Home.Api.Features.Groups.GetGroup;

[Authorize]
[ApiController]
[Route("api/groups/{groupId}")]
[Tags("groups")]
[Produces("application/json")]
public class GetGroupController(GetGroupHandler handler) : ControllerBase
{
    [SwaggerOperation(Summary = "Get group")]
    [HttpGet]
    [ProducesResponseType(typeof(GetGroupResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetGroupAsync(
        [FromRoute, Budget4HomeId] string groupId,
        CancellationToken cancellationToken)
    {
        var result = await handler.RunAsync(groupId, cancellationToken);
        return Ok(new GetGroupResponse { Group = new GroupResponse(result) });
    }
}