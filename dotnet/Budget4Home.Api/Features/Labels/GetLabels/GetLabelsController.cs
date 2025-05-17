using Budget4Home.Api.Attributes;
using Budget4Home.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Budget4Home.Api.Features.Labels.GetLabels;

[ApiController]
[Tags("labels")]
[Route("api/groups/{groupId}/labels")]
[Produces("application/json")]
public class GetLabelsController(GetLabelsHandler handler) : ControllerBase
{
    [SwaggerOperation(Summary = "Get labels")]
    [HttpGet]
    [ProducesResponseType(typeof(GetLabelsResponse), StatusCodes.Status201Created)]
    public async Task<IActionResult> GetLabelsAsync(
        [FromRoute, Budget4HomeId] string groupId,
        CancellationToken cancellationToken)
    {
        var result = await handler.Handle(groupId, cancellationToken);
        return Ok(new GetLabelsResponse { Labels = result.Select(x => new LabelResponse(x)).ToList() });
    }
}