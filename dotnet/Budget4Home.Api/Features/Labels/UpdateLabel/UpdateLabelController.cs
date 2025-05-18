using System.ComponentModel.DataAnnotations;
using Budget4Home.Api.Attributes;
using Budget4Home.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Budget4Home.Api.Features.Labels.UpdateLabel;

[Authorize]
[ApiController]
[Tags("labels")]
[Route("api/groups/{groupId}/labels/{labelId}")]
[Produces("application/json")]
public class UpdateLabelController(UpdateLabelHandler handler) : ControllerBase
{
    [SwaggerOperation(Summary = "Update label")]
    [HttpPut]
    [ProducesResponseType(typeof(UpdateLabelResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetLabelsAsync(
        [FromRoute, Required, Budget4HomeId] string groupId,
        [FromRoute, Required, Budget4HomeId] string labelId,
        [FromBody, Required] UpdateLabelRequest request,
        CancellationToken cancellationToken)
    {
        var result = await handler.Handle(groupId, labelId, request, cancellationToken);
        return Ok(new UpdateLabelResponse { Label = new LabelResponse(result) });
    }
}