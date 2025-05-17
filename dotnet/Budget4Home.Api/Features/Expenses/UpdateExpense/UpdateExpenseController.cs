using System.ComponentModel.DataAnnotations;
using Budget4Home.Api.Attributes;
using Budget4Home.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Budget4Home.Api.Features.Expenses.UpdateExpense;

[ApiController]
[Route("api/groups/{groupId}/expenses/{expenseId}")]
[Tags("expenses")]
[Produces("application/json")]
public class UpdateExpenseController(UpdateExpenseHandler handler) : ControllerBase
{
    [HttpPut]
    [ProducesResponseType(typeof(UpdateExpenseResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> UpdateExpenseAsync(
        [FromRoute, Required, Budget4HomeId] string groupId,
        [FromRoute, Required, Budget4HomeId] string expenseId,
        [FromBody] UpdateExpenseRequest request,
        CancellationToken cancellationToken)
    {
        var result = await handler.RunAsync(groupId, expenseId, request,  cancellationToken);
        return Ok(new UpdateExpenseResponse { Expense = new ExpenseResponse(result)});
    }
}