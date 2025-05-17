using Budget4Home.Api.Attributes;
using Budget4Home.Api.Configuration.Auth;
using Budget4Home.Api.Features.Groups.AddGroup;
using Budget4Home.Mongo.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Budget4Home.Api.Features.Groups.UpdateGroup;

[AutoRegister(typeof(UpdateGroupHandler), Scope = ServiceScope.Scoped)]
public class UpdateGroupHandler(
    AuthContext authContext,
    IMongoCollection<GroupDocument> collection,
    ILogger<AddGroupHandler> logger)
{
    public async Task<GroupDocument> Handle(
        UpdateGroupRequest request,
        CancellationToken cancellationToken)
    {
        var doc = request.ToDocument();
        doc.Update(authContext.UserId);
        
        var filter = Builders<GroupDocument>.Filter.And(
            Builders<GroupDocument>.Filter.Eq(x => x.Id, ObjectId.Parse(request.Id)),
            Builders<GroupDocument>.Filter.AnyEq(x => x.UserIds, ObjectId.Parse(authContext.UserId))
        );
        var update = Builders<GroupDocument>.Update
            .Set(x => x.Name, doc.Name)
            .Set(x => x.UserIds, doc.UserIds)
            .Set(x => x.UpdatedBy, doc.UpdatedBy)
            .Set(x => x.UpdatedAt, doc.UpdatedAt);

        var result = await collection.UpdateOneAsync(filter, update, new UpdateOptions(), cancellationToken);
        if (result.ModifiedCount == 0)
        {
            throw new InvalidOperationException($"Group with ID {request.Id} not found or you do not have permission to update it.");
        }
        
        logger.LogInformation("Updated group {ObjectId}.", doc.Id.ToString());
        
        return doc;
    }
}
