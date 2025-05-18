using Budget4Home.Api.Attributes;
using Budget4Home.Api.Configuration.Auth;
using Budget4Home.Api.Configuration.Exceptions;
using Budget4Home.Api.Features.Groups.GetGroup;
using Budget4Home.Api.Features.Labels.AddLabel;
using Budget4Home.Api.Models.Mongo;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Budget4Home.Api.Features.Labels.GetLabel;

[AutoRegister(typeof(GetLabelHandler), Scope = ServiceScope.Scoped)]
public class GetLabelHandler(
    IMongoCollection<LabelDocument> collection,
    GetGroupHandler getGroupHandler,
    ILogger<AddLabelHandler> logger)
{
    public async Task<LabelDocument> Handle(
        string groupId,
        string labelId,
        CancellationToken cancellationToken)
    {
        await getGroupHandler.Handle(groupId, cancellationToken);
        
        var doc = await collection
            .Find(x => x.Id == ObjectId.Parse(labelId) && x.GroupId == ObjectId.Parse(groupId))
            .FirstOrDefaultAsync(cancellationToken) ?? throw new NotFoundException($"Label {labelId} not found.");
        
        logger.LogInformation("Fetched label {ObjectId}.", doc.Id.ToString());
        
        return doc;
    }
}