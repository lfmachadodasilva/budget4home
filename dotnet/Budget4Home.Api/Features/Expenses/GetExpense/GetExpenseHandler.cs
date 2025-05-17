using Budget4Home.Api.Attributes;
using Budget4Home.Api.Configuration.Exceptions;
using Budget4Home.Mongo.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Budget4Home.Api.Features.Expenses.GetExpense;

[AutoRegister(typeof(GetExpenseHandler), Scope = ServiceScope.Scoped)]
public class GetExpenseHandler(IMongoCollection<ExpenseDocument> expenseCollection)
{
    public async Task<ExpenseDocument> RunAsync(
        string groupId,
        string expenseId,
        CancellationToken cancellationToken) => await expenseCollection
            .Find(x => x.GroupId == ObjectId.Parse(groupId) && x.Id == ObjectId.Parse(expenseId))
            .FirstOrDefaultAsync(cancellationToken) ?? 
                throw new NotFoundException($"Expense with id {expenseId} not found");
}