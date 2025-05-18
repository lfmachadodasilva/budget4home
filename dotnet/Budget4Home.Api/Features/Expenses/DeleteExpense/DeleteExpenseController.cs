using System.ComponentModel.DataAnnotations;
using Budget4Home.Api.Attributes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Budget4Home.Api.Features.Expenses.DeleteExpense;

[Authorize]
[ApiController]
[Tags("expenses")]
[Produces("application/json")]
public class DeleteExpenseController(DeleteExpenseHandler handler) : ControllerBase
{
    [SwaggerOperation(Summary = "Delete expense")]
    [HttpDelete]
    [Route("api/groups/{groupId}/expenses/{expenseId}")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    public async Task<IActionResult> DeleteExpenseAsync(
        [Required, FromRoute, Budget4HomeId] string groupId,
        [Required, FromRoute, Budget4HomeId] string expenseId,
        CancellationToken cancellationToken)
    {
        await handler.RunAsync(groupId, expenseId, cancellationToken);
        return Ok();
    }
    
    [SwaggerOperation(Summary = "Delete expenses")]
    [HttpDelete]
    [Route("api/groups/{groupId}/expenses")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    public async Task<IActionResult> DeleteExpensesAsync(
        [Required, FromRoute, Budget4HomeId] string groupId,
        CancellationToken cancellationToken)
    {
        await handler.RunAsync(groupId, cancellationToken);
        return Ok();
    }
}