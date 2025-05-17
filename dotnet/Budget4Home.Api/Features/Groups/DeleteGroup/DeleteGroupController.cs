using System.ComponentModel.DataAnnotations;
using Budget4Home.Api.Attributes;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Budget4Home.Api.Features.Groups.DeleteGroup;

[ApiController]
[Route("api/groups/{groupId}")]
[Tags("groups")]
[Produces("application/json")]
public class DeleteGroupController(DeleteGroupHandler handler) : ControllerBase
{
    [SwaggerOperation(Summary = "Delete group")]
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> DeleteExpenseAsync(
        [FromRoute, Required, Budget4HomeId] string groupId,
        CancellationToken cancellationToken)
    {
        await handler.RunAsync(groupId, cancellationToken);
        return Ok();
    }
}