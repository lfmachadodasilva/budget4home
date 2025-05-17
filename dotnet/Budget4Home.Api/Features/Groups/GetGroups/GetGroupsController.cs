using Budget4Home.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Budget4Home.Api.Features.Groups.GetGroups;

[ApiController]
[Route("api/groups")]
[Tags("groups")]
[Produces("application/json")]
public class GetGroupsController(GetGroupsHandler handler) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(typeof(GetGroupsResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetGroupsAsync(CancellationToken cancellationToken)
    {
        var result = await handler.Handle(cancellationToken);

        if (result is null)
        {
            return NotFound();
        }
        
        return Ok(new GetGroupsResponse { Groups = result.Select(x => new GroupResponse(x)).ToList() });
    }
}