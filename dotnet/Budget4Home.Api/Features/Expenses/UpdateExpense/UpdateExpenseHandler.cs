using Budget4Home.Api.Attributes;
using Budget4Home.Api.Configuration.Auth;
using Budget4Home.Api.Configuration.Exceptions;
using Budget4Home.Api.Models.Mongo;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Budget4Home.Api.Features.Expenses.UpdateExpense;

[AutoRegister(typeof(UpdateExpenseHandler), Scope = ServiceScope.Scoped)]
public class UpdateExpenseHandler(
    AuthContext authContext,
    IMongoCollection<ExpenseDocument> collection,
    ILogger<UpdateExpenseHandler> logger)
{
    public async Task<ExpenseDocument> RunAsync(
        string groupId,
        string expenseId,
        UpdateExpenseRequest request,
        CancellationToken cancellationToken)
    {
        var doc = request.ToDocument(id: expenseId, groupId: groupId);
        doc.Update(authContext.UserId);
            
        var filter = Builders<ExpenseDocument>.Filter.And(
            Builders<ExpenseDocument>.Filter.Eq(x => x.Id, ObjectId.Parse(groupId)),
            Builders<ExpenseDocument>.Filter.Eq(x => x.GroupId, ObjectId.Parse(groupId))
        );

        var result = await collection.ReplaceOneAsync(filter, doc, new ReplaceOptions(), cancellationToken);
        if (result.IsAcknowledged && result.ModifiedCount == 1)
        {
            logger.LogInformation("Updated expense {ObjectId}.", doc.Id.ToString());
            return doc;
        }
            
        throw new NotFoundException($"Expense with id {expenseId} not found.");
    }
}