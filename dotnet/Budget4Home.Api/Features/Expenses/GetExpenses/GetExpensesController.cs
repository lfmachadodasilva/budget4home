using Budget4Home.Api.Attributes;
using Budget4Home.Api.Models;
using Budget4Home.Mongo.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace Budget4Home.Api.Features.Expenses.GetExpenses;

[ApiController]
[Route("api/groups/{groupId}/expenses")]
[Tags("expenses")]
[Produces("application/json")]
public class GetExpensesController(IMongoCollection<ExpenseDocument> expenseCollection) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(typeof(GetExpensesResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetExpensesAsync([FromRoute, Budget4HomeId] string groupId)
    {
        var result = await expenseCollection
            .Find(x => x.GroupId == groupId)
            .ToListAsync();
        return Ok(new GetExpensesResponse
        {
            Expenses = new List<ExpenseResponse>(result.Select(x => new ExpenseResponse(x)))
        });
    }
}