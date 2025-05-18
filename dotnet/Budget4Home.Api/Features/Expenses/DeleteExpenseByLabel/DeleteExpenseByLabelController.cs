using System.ComponentModel.DataAnnotations;
using Budget4Home.Api.Attributes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Budget4Home.Api.Features.Expenses.DeleteExpenseByLabel;

[Authorize]
[ApiController]
[Tags("expenses")]
[Produces("application/json")]
public class DeleteExpenseByLabelController(DeleteExpenseByLabelHandler handler) : ControllerBase
{
    [SwaggerOperation(Summary = "Delete expenses by label")]
    [HttpDelete]
    [Route("api/groups/{groupId}/labels/{labelId}/expenses")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    public async Task<IActionResult> GetExpensesByLabelAsync(
        [Required, FromRoute, Budget4HomeId] string groupId,
        [Required, FromRoute, Budget4HomeId] string labelId,
        CancellationToken cancellationToken)
    {
        await handler.RunAsync(groupId, labelId, cancellationToken);
        return Ok();
    }
}