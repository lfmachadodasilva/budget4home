using System.ComponentModel.DataAnnotations;
using Budget4Home.Api.Attributes;
using Budget4Home.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Budget4Home.Api.Features.Labels.AddLabel;

[Authorize]
[ApiController]
[Tags("labels")]
[Route("api/groups/{groupId}/labels")]
[Produces("application/json")]
public class AddLabelController(AddLabelHandler handler) : ControllerBase
{
    [SwaggerOperation(Summary = "Add label")]
    [HttpPost]
    [ProducesResponseType(typeof(AddLabelResponse), StatusCodes.Status201Created)]
    public async Task<IActionResult> GetLabelAsync(
        [Required, FromRoute, Budget4HomeId] string groupId,
        [Required, FromBody] AddLabelRequest request,
        CancellationToken cancellationToken)
    {
        var result = await handler.Handle(groupId, request, cancellationToken);
        return Created($"/api/labels/{result.Id}", new AddLabelResponse { Label = new LabelResponse(result) });
    }
}