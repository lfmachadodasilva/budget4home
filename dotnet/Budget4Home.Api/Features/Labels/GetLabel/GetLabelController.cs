using Budget4Home.Api.Attributes;
using Budget4Home.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Budget4Home.Api.Features.Labels.GetLabel;

[ApiController]
[Tags("labels")]
[Route("api/groups/{groupId}/labels/{labelId}")]
[Produces("application/json")]
public class GetLabelController(GetLabelHandler handler) : ControllerBase
{
    [SwaggerOperation(Summary = "Get label")]
    [HttpGet]
    [ProducesResponseType(typeof(GetLabelResponse), StatusCodes.Status201Created)]
    public async Task<IActionResult> GetLabelAsync(
        [FromRoute, Budget4HomeId] string groupId,
        [FromRoute, Budget4HomeId] string labelId,
        CancellationToken cancellationToken)
    {
        var result = await handler.Handle(groupId, labelId, cancellationToken);
        return Ok(new GetLabelResponse {Label = new LabelResponse(result)});
    }
}