using System.ComponentModel.DataAnnotations;
using Budget4Home.Api.Attributes;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Budget4Home.Api.Features.Labels.DeleteLabel;

[ApiController]
[Tags("labels")]
[Produces("application/json")]
public class DeleteLabelController(DeleteLabelHandler handler) : ControllerBase
{
    [SwaggerOperation(Summary = "Delete label")]
    [HttpDelete]
    [Route("api/groups/{groupId}/labels/{labelId}")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    public async Task<IActionResult> GetLabelAsync(
        [Required, FromRoute, Budget4HomeId] string groupId,
        [Required, FromRoute, Budget4HomeId] string labelId,
        CancellationToken cancellationToken)
    {
        await handler.RunAsync(groupId, labelId, cancellationToken);
        return Ok();
    }
    
    [SwaggerOperation(Summary = "Delete labels")]
    [HttpDelete]
    [Route("api/groups/{groupId}/labels")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    public async Task<IActionResult> GetLabelsAsync(
        [Required, FromRoute, Budget4HomeId] string groupId,
        CancellationToken cancellationToken)
    {
        await handler.RunAsync(groupId, cancellationToken);
        return Ok();
    }
}