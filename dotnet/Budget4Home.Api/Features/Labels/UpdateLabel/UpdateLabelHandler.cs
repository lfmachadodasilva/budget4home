using Budget4Home.Api.Attributes;
using Budget4Home.Api.Configuration.Auth;
using Budget4Home.Api.Configuration.Exceptions;
using Budget4Home.Api.Features.Groups.GetGroup;
using Budget4Home.Mongo.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Budget4Home.Api.Features.Labels.UpdateLabel;

[AutoRegister(typeof(UpdateLabelHandler), Scope = ServiceScope.Scoped)]
public class UpdateLabelHandler(
    AuthContext authContext,
    IMongoCollection<LabelDocument> collection,
    GetGroupHandler getGroupHandler,
    ILogger<UpdateLabelHandler> logger)
{
    public async Task<LabelDocument> Handle(
        string groupId,
        string labelId,
        UpdateLabelRequest request,
        CancellationToken cancellationToken)
    {
        await getGroupHandler.Handle(groupId, cancellationToken);
        
        var doc = request.ToDocument(id: labelId, groupId: groupId);
        doc.Update(authContext.UserId);
        
        var filter = Builders<LabelDocument>.Filter.And(
            Builders<LabelDocument>.Filter.Eq(x => x.Id, ObjectId.Parse(labelId)),
            Builders<LabelDocument>.Filter.Eq(x => x.GroupId, ObjectId.Parse(groupId))
        );
        var update = Builders<LabelDocument>.Update
            .Set(x => x.Name, doc.Name)
            .Set(x => x.Icon, doc.Icon)
            .Set(x => x.UpdatedBy, doc.UpdatedBy)
            .Set(x => x.UpdatedAt, doc.UpdatedAt);
        
        var result = await collection.UpdateOneAsync(filter, update, new UpdateOptions(), cancellationToken);
        
        if (result.IsAcknowledged && result.ModifiedCount == 1)
        {
            logger.LogInformation("Updated label {ObjectId}.", doc.Id.ToString());
            return doc;
        }
        
        throw new NotFoundException($"Label with id {labelId} not found.");
    }
}