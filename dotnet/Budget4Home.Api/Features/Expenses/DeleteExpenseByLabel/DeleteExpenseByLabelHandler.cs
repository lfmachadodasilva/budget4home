using Budget4Home.Api.Attributes;
using Budget4Home.Api.Features.Groups.GetGroup;
using Budget4Home.Api.Features.Labels.GetLabel;
using Budget4Home.Api.Models.Mongo;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Budget4Home.Api.Features.Expenses.DeleteExpenseByLabel;

[AutoRegister(typeof(DeleteExpenseByLabelHandler), Scope = ServiceScope.Scoped)]
public class DeleteExpenseByLabelHandler(
    GetGroupHandler getGroupHandler,
    GetLabelHandler getLabelHandler,
    IMongoCollection<ExpenseDocument> collection)
{
    public async Task RunAsync(
        string groupId,
        string labelId,
        CancellationToken cancellationToken)
    {
        await Task.WhenAll(
            getGroupHandler.Handle(groupId, cancellationToken),
            getLabelHandler.Handle(groupId, labelId, cancellationToken));
        
        await collection.DeleteManyAsync(
            Builders<ExpenseDocument>.Filter.And(
                Builders<ExpenseDocument>.Filter.Eq(x => x.LabelId, ObjectId.Parse(labelId)),
                Builders<ExpenseDocument>.Filter.Eq(x => x.GroupId, ObjectId.Parse(groupId))),
            new DeleteOptions(),
            cancellationToken);
    }
}