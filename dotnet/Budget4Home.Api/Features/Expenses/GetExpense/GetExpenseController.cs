using Budget4Home.Api.Attributes;
using Budget4Home.Api.Models;
using Budget4Home.Mongo.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Budget4Home.Api.Features.Expenses.GetExpense;

[ApiController]
[Route("api/groups/{groupId}/expenses/{expenseId}")]
[Tags("expenses")]
[Produces("application/json")]
public class GetExpenseController(IMongoCollection<ExpenseDocument> expenseCollection) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(typeof(GetExpenseResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetExpensesAsync(
        [FromRoute, Budget4HomeId] string groupId,
        [FromRoute, Budget4HomeId] string expenseId)
    {
        var result = await expenseCollection
            .Find(x => x.GroupId == groupId && x.Id == ObjectId.Parse(expenseId))
            .FirstOrDefaultAsync();

        if (result is null)
        {
            return NotFound();
        }

        return Ok(new GetExpenseResponse { Expense = new ExpenseResponse(result) });
    }
}