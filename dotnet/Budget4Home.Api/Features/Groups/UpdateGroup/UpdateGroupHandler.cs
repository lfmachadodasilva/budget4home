using Budget4Home.Api.Attributes;
using Budget4Home.Api.Configuration.Auth;
using Budget4Home.Api.Configuration.Exceptions;
using Budget4Home.Api.Features.Groups.AddGroup;
using Budget4Home.Api.Features.Users.GetUsers;
using Budget4Home.Api.Models.Mongo;
using Budget4Home.Api.Utils;
using Microsoft.Extensions.Caching.Memory;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Budget4Home.Api.Features.Groups.UpdateGroup;

[AutoRegister(typeof(UpdateGroupHandler), Scope = ServiceScope.Scoped)]
public class UpdateGroupHandler(
    AuthContext authContext,
    IMongoCollection<GroupDocument> collection,
    GetUsersHandle getUsersHandler,
    IMemoryCache memoryCache,
    ILogger<AddGroupHandler> logger)
{
    public async Task<GroupDocument> Handle(
        string groupId,
        UpdateGroupRequest request,
        CancellationToken cancellationToken)
    {
        var users = await getUsersHandler.RunAsync(cancellationToken);
        if (!request.UserIds.Except(users.Select(x => x.Id.ToString())).Any())
        {
            throw new NotFoundException("One or more users not found.");
        }
        
        var doc = request.ToDocument(groupId);
        doc.Update(authContext.UserId);
        
        var filter = Builders<GroupDocument>.Filter.And(
            Builders<GroupDocument>.Filter.Eq(x => x.Id, ObjectId.Parse(groupId)),
            Builders<GroupDocument>.Filter.AnyEq(x => x.UserIds, ObjectId.Parse(authContext.UserId))
        );

        var result = await collection.ReplaceOneAsync(filter, doc, new ReplaceOptions(), cancellationToken);
        if (result.IsAcknowledged && result.ModifiedCount == 1)
        {
            memoryCache.Remove(CacheKeys.GetGroupKey(groupId, authContext.UserId));
            logger.LogInformation("Updated label {ObjectId}.", doc.Id.ToString());
            return doc;
        }
        
        throw new NotFoundException($"Group with id {groupId} not found.");
    }
}
