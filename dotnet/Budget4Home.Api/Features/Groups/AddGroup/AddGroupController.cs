using Budget4Home.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Budget4Home.Api.Features.Groups.AddGroup;

[ApiController]
[Route("api/groups")]
[Tags("groups")]
[Produces("application/json")]
public class AddGroupController(AddGroupHandler handler) : ControllerBase
{
    [HttpPost]
    [ProducesResponseType(typeof(AddGroupResponse), StatusCodes.Status201Created)]
    public async Task<IActionResult> GetGroupAsync(
        [FromBody] AddGroupRequest request,
        CancellationToken cancellationToken)
    {
        var result = await handler.Handle(request, cancellationToken);
        return Created($"/api/groups/{result.Id}", new AddGroupResponse { Group = new GroupResponse(result) });
    }
}