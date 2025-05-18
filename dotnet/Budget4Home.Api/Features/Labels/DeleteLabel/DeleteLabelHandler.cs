using Budget4Home.Api.Attributes;
using Budget4Home.Api.Configuration.Exceptions;
using Budget4Home.Api.Features.Expenses.DeleteExpense;
using Budget4Home.Api.Features.Expenses.DeleteExpenseByLabel;
using Budget4Home.Api.Features.Groups.GetGroup;
using Budget4Home.Api.Models.Mongo;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Budget4Home.Api.Features.Labels.DeleteLabel;

[AutoRegister(typeof(DeleteLabelHandler), Scope = ServiceScope.Scoped)]
public class DeleteLabelHandler(
    IMongoClient mongoClient,
    GetGroupHandler getGroupHandler,
    DeleteExpenseHandler deleteExpenseHandler,
    DeleteExpenseByLabelHandler deleteExpenseByLabelHandler,
    IMongoCollection<LabelDocument> collection)
{
    public async Task RunAsync(string groupId, string labelId, CancellationToken cancellationToken)
    {
        await getGroupHandler.Handle(groupId, cancellationToken);
        
        await deleteExpenseByLabelHandler.RunAsync(groupId, labelId, cancellationToken);
        
        var result = await collection.DeleteOneAsync(
            Builders<LabelDocument>.Filter.And(
                Builders<LabelDocument>.Filter.Eq(x => x.Id, ObjectId.Parse(labelId)),
                Builders<LabelDocument>.Filter.Eq(x => x.GroupId, ObjectId.Parse(groupId))),
            new DeleteOptions(),
            cancellationToken);

        if (result.IsAcknowledged && result.DeletedCount == 0)
        {
            throw new NotFoundException($"Label {labelId} not found.");
        }
    }
    
    public async Task RunAsync(string groupId, CancellationToken cancellationToken)
    {
        await getGroupHandler.Handle(groupId, cancellationToken);
        
        await Task.WhenAll(
            collection.DeleteManyAsync(
                Builders<LabelDocument>.Filter.Eq(x => x.GroupId, ObjectId.Parse(groupId)),
                new DeleteOptions(),
                cancellationToken),
            deleteExpenseHandler.RunAsync(groupId, cancellationToken)
        );
    }
}