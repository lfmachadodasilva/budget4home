using Budget4Home.Api.Attributes;
using Budget4Home.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Budget4Home.Api.Features.Expenses.GetExpense;

[Authorize]
[ApiController]
[Route("api/groups/{groupId}/expenses/{expenseId}")]
[Tags("expenses")]
[Produces("application/json")]
public class GetExpenseController(GetExpenseHandler handler) : ControllerBase
{
    [SwaggerOperation(Summary = "Get expense")]
    [HttpGet]
    [ProducesResponseType(typeof(GetExpenseResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetExpensesAsync(
        [FromRoute, Budget4HomeId] string groupId,
        [FromRoute, Budget4HomeId] string expenseId,
        CancellationToken cancellationToken)
    {
        var result = await handler.RunAsync(groupId, expenseId, cancellationToken);
        return Ok(new GetExpenseResponse { Expense = new ExpenseResponse(result) });
    }
}