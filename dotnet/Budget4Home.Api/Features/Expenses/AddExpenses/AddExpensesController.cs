using Budget4Home.Api.Attributes;
using Budget4Home.Api.Models;
using Budget4Home.Mongo.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Swashbuckle.AspNetCore.Annotations;

namespace Budget4Home.Api.Features.Expenses.AddExpenses;

[ApiController]
[Tags("expenses")]
[Produces("application/json")]
public class AddExpensesController(IMongoCollection<ExpenseDocument> expenseCollection) : ControllerBase
{
    [SwaggerOperation(
        Summary = "Add expenses",
        Description = "Add multiple expenses")]
    [HttpPost("api/groups/{groupId}/expenses")]
    [ProducesResponseType(typeof(AddExpensesResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetExpensesAsync(
        [Budget4HomeId] string groupId,
        [FromBody] AddExpensesRequest request)
    {
        var docs = request.Expenses
            .Select(x =>
            {
                var doc = x.ToDocument();
                doc.CreatedAt = DateTime.UtcNow;
                doc.UpdatedAt = DateTime.UtcNow;
                doc.GroupId = groupId;
                return doc;
            })
            .ToList();
        await expenseCollection.InsertManyAsync(docs);
        return Ok(new AddExpensesResponse { Expenses = docs.Select(x => new ExpenseResponse(x)).ToList() });
    }
}