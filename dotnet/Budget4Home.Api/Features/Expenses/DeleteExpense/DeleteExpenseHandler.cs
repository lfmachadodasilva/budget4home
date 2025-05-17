using Budget4Home.Api.Attributes;
using Budget4Home.Api.Configuration.Exceptions;
using Budget4Home.Api.Features.Groups.GetGroup;
using Budget4Home.Mongo.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Budget4Home.Api.Features.Expenses.DeleteExpense;

[AutoRegister(typeof(DeleteExpenseHandler), Scope = ServiceScope.Scoped)]
public class DeleteExpenseHandler(
    GetGroupHandler getGroupHandler,
    IMongoCollection<ExpenseDocument> collection)
{
    public async Task RunAsync(string groupId, string expenseId, CancellationToken cancellationToken)
    {
        await getGroupHandler.Handle(groupId, cancellationToken);
        
        await getGroupHandler.Handle(groupId, cancellationToken);
        var result = await collection.DeleteOneAsync(
            Builders<ExpenseDocument>.Filter.And(
                Builders<ExpenseDocument>.Filter.Eq(x => x.Id, ObjectId.Parse(expenseId)),
                Builders<ExpenseDocument>.Filter.Eq(x => x.GroupId, ObjectId.Parse(groupId))),
            cancellationToken);

        if (result.IsAcknowledged && result.DeletedCount == 0)
        {
            throw new NotFoundException($"Expense {expenseId} not found.");
        }
    }
    
    public async Task RunAsync(string groupId, CancellationToken cancellationToken)
    {
        await getGroupHandler.Handle(groupId, cancellationToken);
        await collection.DeleteManyAsync(
            Builders<ExpenseDocument>.Filter.Eq(x => x.GroupId, ObjectId.Parse(groupId)),
            cancellationToken);
    }
}