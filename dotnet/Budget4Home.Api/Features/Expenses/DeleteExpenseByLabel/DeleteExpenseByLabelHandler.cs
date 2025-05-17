using Budget4Home.Api.Attributes;
using Budget4Home.Api.Features.Groups.GetGroup;
using Budget4Home.Mongo.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Budget4Home.Api.Features.Expenses.DeleteExpenseByLabel;

[AutoRegister(typeof(DeleteExpenseByLabelHandler), Scope = ServiceScope.Scoped)]
public class DeleteExpenseByLabelHandler(
    GetGroupHandler getGroupHandler,
    IMongoCollection<ExpenseDocument> collection)
{
    public async Task RunAsync(string groupId, string labelId, CancellationToken cancellationToken)
    {
        await getGroupHandler.Handle(groupId, cancellationToken);
        await collection.DeleteOneAsync(
            Builders<ExpenseDocument>.Filter.And(
                Builders<ExpenseDocument>.Filter.Eq(x => x.LabelId, ObjectId.Parse(labelId)),
                Builders<ExpenseDocument>.Filter.Eq(x => x.GroupId, ObjectId.Parse(groupId))),
            cancellationToken);
    }
}