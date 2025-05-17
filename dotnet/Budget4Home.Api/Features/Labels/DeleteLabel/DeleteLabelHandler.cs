using Budget4Home.Api.Configuration.Auth;
using Budget4Home.Api.Configuration.Exceptions;
using Budget4Home.Api.Features.Groups.GetGroup;
using Budget4Home.Mongo.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Budget4Home.Api.Features.Labels.DeleteLabel;

public class DeleteLabelHandler(
    GetGroupHandler getGroupHandler,
    IMongoCollection<LabelDocument> collection)
{
    public async Task RunAsync(string groupId, string labelId, CancellationToken cancellationToken)
    {
        await getGroupHandler.Handle(groupId, cancellationToken);
        var result = await collection.DeleteOneAsync(
            Builders<LabelDocument>.Filter.And(
                Builders<LabelDocument>.Filter.Eq(x => x.Id, ObjectId.Parse(labelId)),
                Builders<LabelDocument>.Filter.Eq(x => x.GroupId, ObjectId.Parse(groupId))),
            cancellationToken);

        if (result.IsAcknowledged && result.DeletedCount == 0)
        {
            throw new NotFoundException($"Label {labelId} not found.");
        }
    }
    
    public async Task RunAsync(string groupId, CancellationToken cancellationToken)
    {
        await getGroupHandler.Handle(groupId, cancellationToken);
        await collection.DeleteManyAsync(
            Builders<LabelDocument>.Filter.Eq(x => x.GroupId, ObjectId.Parse(groupId)),
            cancellationToken);
    }
}