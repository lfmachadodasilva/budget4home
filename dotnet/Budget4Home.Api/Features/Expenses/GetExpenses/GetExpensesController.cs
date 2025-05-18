using Budget4Home.Api.Attributes;
using Budget4Home.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Budget4Home.Api.Features.Expenses.GetExpenses;

[Authorize]
[ApiController]
[Route("api/groups/{groupId}/expenses")]
[Tags("expenses")]
[Produces("application/json")]
public class GetExpensesController(
    GetExpensesHandler handler) : ControllerBase
{
    [SwaggerOperation(Summary = "Get expenses")]
    [HttpGet]
    [ProducesResponseType(typeof(GetExpensesResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetExpensesAsync(
        [FromRoute, Budget4HomeId] string groupId,
        [FromQuery] DateTime? from = null,
        [FromQuery] DateTime? to = null)
    {
        var result = await handler.RunAsync(groupId, from, to);
        return Ok(new GetExpensesResponse
        {
            Expenses = new List<ExpenseResponse>(result.Select(x => new ExpenseResponse(x)))
        });
    }
}