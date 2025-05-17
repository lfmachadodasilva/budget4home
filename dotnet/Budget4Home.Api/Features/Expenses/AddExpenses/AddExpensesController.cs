using System.ComponentModel.DataAnnotations;
using Budget4Home.Api.Attributes;
using Budget4Home.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Budget4Home.Api.Features.Expenses.AddExpenses;

[ApiController]
[Tags("expenses")]
[Produces("application/json")]
public class AddExpensesController(AddExpensesHandler handler) : ControllerBase
{
    [SwaggerOperation(
        Summary = "Add expenses",
        Description = "Add multiple expenses")]
    [HttpPost("api/groups/{groupId}/expenses")]
    [ProducesResponseType(typeof(AddExpensesResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetExpensesAsync(
        [Required, Budget4HomeId] string groupId,
        [FromBody, Required] AddExpensesRequest request,
        CancellationToken cancellationToken)
    {
        var results = await handler.RunAsync(groupId, request, cancellationToken);
        return Ok(new AddExpensesResponse { Expenses = results.Select(x => new ExpenseResponse(x)).ToList() });
    }
}