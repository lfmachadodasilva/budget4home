using System.ComponentModel.DataAnnotations;
using Budget4Home.Api.Attributes;
using Microsoft.AspNetCore.Mvc;

namespace Budget4Home.Api.Features.Expenses.DeleteExpense;

[ApiController]
[Tags("expenses")]
[Produces("application/json")]
public class DeleteExpenseController(DeleteExpenseHandler handler) : ControllerBase
{
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