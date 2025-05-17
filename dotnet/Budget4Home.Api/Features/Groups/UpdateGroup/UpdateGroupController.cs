using System.ComponentModel.DataAnnotations;
using Budget4Home.Api.Attributes;
using Budget4Home.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Budget4Home.Api.Features.Groups.UpdateGroup;

[ApiController]
[Route("api/groups/{groupId}")]
[Tags("groups")]
[Produces("application/json")]
public class UpdateGroupController(UpdateGroupHandler handler) : ControllerBase
{
    [HttpPut]
    [ProducesResponseType(typeof(UpdateGroupResponse), StatusCodes.Status201Created)]
    public async Task<IActionResult> GetGroupAsync(
        [FromRoute, Required, Budget4HomeId] string groupId,
        [FromBody] UpdateGroupRequest request,
        CancellationToken cancellationToken)
    {
        var result = await handler.Handle(groupId, request, cancellationToken);
        return Ok(new UpdateGroupResponse { Group = new GroupResponse(result) });
    }
}